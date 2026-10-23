import { describe, expect, it, vi } from 'vitest';
import { checkChatRateLimit, hashClientIdentity } from './chat-rate-limit';

const now = new Date('2026-10-23T03:00:00.000Z');

describe('chat rate limit', () => {
  it('hashes client identity before persistence', () => {
    expect(hashClientIdentity('203.0.113.8', 'secret')).toMatch(
      /^[a-f0-9]{64}$/
    );
    expect(hashClientIdentity('203.0.113.8', 'secret')).not.toContain(
      '203.0.113.8'
    );
  });

  it('allows request when both counters are below their limits', async () => {
    const consume = vi.fn().mockResolvedValue({ allowed: true, retryAfter: 0 });
    process.env.AUTH_SECRET = 'secret';
    await expect(
      checkChatRateLimit('client', { consume }, now)
    ).resolves.toEqual({ allowed: true, retryAfter: 0 });
    expect(consume).toHaveBeenCalledWith(
      expect.objectContaining({ clientLimit: 10, globalLimit: 200 })
    );
  });

  it('returns retry information when a limit is exhausted', async () => {
    const consume = vi
      .fn()
      .mockResolvedValue({ allowed: false, retryAfter: 300 });
    process.env.AUTH_SECRET = 'secret';
    await expect(
      checkChatRateLimit('client', { consume }, now)
    ).resolves.toEqual({ allowed: false, retryAfter: 300 });
  });
});
