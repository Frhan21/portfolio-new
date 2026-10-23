import { createHmac } from 'node:crypto';

type LimitResult = { allowed: boolean; retryAfter: number };
type ConsumeInput = {
  clientHash: string;
  windowStart: Date;
  dayStart: Date;
  dayEnd: Date;
  now: Date;
  clientLimit: number;
  globalLimit: number;
};
type RateLimitStore = { consume(input: ConsumeInput): Promise<LimitResult> };

export function hashClientIdentity(
  identity: string,
  secret = process.env.AUTH_SECRET
) {
  if (!secret)
    throw new Error('AUTH_SECRET is required for chat rate limiting');
  return createHmac('sha256', secret).update(identity).digest('hex');
}

export function getClientIdentity(headers: Headers) {
  return (
    headers.get('x-vercel-forwarded-for')?.split(',')[0] ?? 'unknown'
  ).trim();
}

function jakartaDay(now: Date) {
  const shifted = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const dayStart = new Date(
    Date.UTC(
      shifted.getUTCFullYear(),
      shifted.getUTCMonth(),
      shifted.getUTCDate()
    ) -
      7 * 60 * 60 * 1000
  );
  return {
    dayStart,
    dayEnd: new Date(dayStart.getTime() + 24 * 60 * 60 * 1000),
  };
}

async function defaultStore(): Promise<RateLimitStore> {
  const { default: prisma } = await import('@/lib/prisma');
  return {
    consume: (input) =>
      prisma.$transaction(async (tx) => {
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(7392041)`;
        await tx.$executeRaw`DELETE FROM chat_rate_limits WHERE created_at < ${input.dayStart}`;
        const rows = await tx.$queryRaw<
          Array<{ allowed: boolean; retry_after: number }>
        >`
          WITH counts AS (
            SELECT
              COUNT(*) FILTER (WHERE client_hash = ${input.clientHash} AND created_at >= ${input.windowStart})::int AS client_count,
              COUNT(*) FILTER (WHERE created_at >= ${input.dayStart} AND created_at < ${input.dayEnd})::int AS global_count,
              MIN(created_at) FILTER (WHERE client_hash = ${input.clientHash} AND created_at >= ${input.windowStart}) AS oldest_client
            FROM chat_rate_limits
          ), inserted AS (
            INSERT INTO chat_rate_limits (client_hash, created_at)
            SELECT ${input.clientHash}, ${input.now}
            FROM counts
            WHERE client_count < ${input.clientLimit} AND global_count < ${input.globalLimit}
            RETURNING 1
          )
          SELECT
            EXISTS(SELECT 1 FROM inserted) AS allowed,
            CASE
              WHEN (SELECT global_count FROM counts) >= ${input.globalLimit}
                THEN CEIL(EXTRACT(EPOCH FROM (${input.dayEnd} - ${input.now})))::int
              WHEN (SELECT client_count FROM counts) >= ${input.clientLimit}
                THEN GREATEST(1, CEIL(EXTRACT(EPOCH FROM ((SELECT oldest_client FROM counts) + INTERVAL '10 minutes' - ${input.now}))))::int
              ELSE 0
            END AS retry_after
        `;
        return { allowed: rows[0].allowed, retryAfter: rows[0].retry_after };
      }),
  };
}

export async function checkChatRateLimit(
  identity: string,
  store?: RateLimitStore,
  now = new Date()
): Promise<LimitResult> {
  const { dayStart, dayEnd } = jakartaDay(now);
  const adapter = store ?? (await defaultStore());
  return adapter.consume({
    clientHash: hashClientIdentity(identity),
    windowStart: new Date(now.getTime() - 10 * 60 * 1000),
    dayStart,
    dayEnd,
    now,
    clientLimit: 10,
    globalLimit: 200,
  });
}
