import { beforeEach, describe, expect, it, vi } from 'vitest';

const ask = vi.fn();
const checkChatRateLimit = vi.fn();

vi.mock('../../../../lib/ai/rag', () => ({ ask }));
vi.mock('../../../../lib/ai/chat-rate-limit', () => ({
  checkChatRateLimit,
  getClientIdentity: () => 'client',
}));

const { POST } = await import('./route');
const request = () =>
  new Request('http://localhost/api/v1/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: 'Who is Farhan?' }),
  });

describe('chat route rate limiting', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 429 with retry time before calling AI', async () => {
    checkChatRateLimit.mockResolvedValue({ allowed: false, retryAfter: 120 });
    const response = await POST(request());
    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('120');
    expect(ask).not.toHaveBeenCalled();
  });

  it('returns 503 before calling AI when limiter fails', async () => {
    checkChatRateLimit.mockRejectedValue(new Error('database unavailable'));
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(ask).not.toHaveBeenCalled();
  });
});
