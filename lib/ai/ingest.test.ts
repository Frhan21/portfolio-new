import { describe, expect, it, vi } from 'vitest';
import { ingestKnowledge, normalizeKnowledge } from './ingets';

const deps = () => ({
  reserve: vi.fn().mockResolvedValue(true),
  release: vi.fn().mockResolvedValue(undefined),
  complete: vi.fn().mockResolvedValue(undefined),
  add: vi.fn().mockResolvedValue(undefined),
});

describe('ingestKnowledge', () => {
  it('normalizes whitespace before duplicate checking', () => {
    expect(normalizeKnowledge('  Hello\r\n\n world  ')).toBe('Hello world');
  });

  it('stores new knowledge with source metadata', async () => {
    const adapters = deps();

    const result = await ingestKnowledge(
      { title: 'About', content: 'Farhan builds web applications.' },
      adapters
    );

    expect(result.status).toBe('ingested');
    expect(adapters.add).toHaveBeenCalledOnce();
    expect(adapters.complete).toHaveBeenCalledOnce();
  });

  it('does not store exact duplicate knowledge', async () => {
    const adapters = deps();
    adapters.reserve.mockResolvedValue(false);

    const result = await ingestKnowledge(
      { title: 'Copy', content: 'Same knowledge' },
      adapters
    );

    expect(result.status).toBe('duplicate');
    expect(adapters.add).not.toHaveBeenCalled();
  });

  it('releases reservation when storage fails so input can be retried', async () => {
    const adapters = deps();
    adapters.add.mockRejectedValue(new Error('embedding unavailable'));

    await expect(
      ingestKnowledge(
        { title: 'Retryable', content: 'Useful knowledge' },
        adapters
      )
    ).rejects.toThrow('embedding unavailable');
    expect(adapters.release).toHaveBeenCalledOnce();
    expect(adapters.complete).not.toHaveBeenCalled();
  });
});
