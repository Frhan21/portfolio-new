import { describe, expect, it, vi, afterAll } from 'vitest';

vi.mock('@langchain/google-genai', () => ({
  GoogleGenerativeAIEmbeddings: vi.fn(
    class {
      constructor(public config: Record<string, unknown>) {}
    }
  ),
}));

import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

const originalKey = process.env.GOOGLE_API_KEY;
const originalModel = process.env.EMBEDDING_MODEL_TYPE;

afterAll(() => {
  if (originalKey === undefined) delete process.env.GOOGLE_API_KEY;
  else process.env.GOOGLE_API_KEY = originalKey;
  if (originalModel === undefined) delete process.env.EMBEDDING_MODEL_TYPE;
  else process.env.EMBEDDING_MODEL_TYPE = originalModel;
});

describe('getEmbeddings', () => {
  it('tolerates missing GOOGLE_API_KEY at import time', async () => {
    vi.resetModules();
    delete process.env.GOOGLE_API_KEY;

    await expect(import('./embeddings')).resolves.toBeTruthy();
  });

  it('rejects embeddings use without key', async () => {
    vi.resetModules();
    delete process.env.GOOGLE_API_KEY;
    const { getEmbeddings } = await import('./embeddings');

    expect(() => getEmbeddings()).toThrow('GOOGLE_API_KEY belum dikonfigurasi');
  });

  it('caches embeddings instance when key present', async () => {
    vi.resetModules();
    process.env.GOOGLE_API_KEY = 'test-key';
    process.env.EMBEDDING_MODEL_TYPE = 'test-model';
    const { getEmbeddings } = await import('./embeddings');

    const first = getEmbeddings();
    const second = getEmbeddings();

    expect(first).toBe(second);
    expect(GoogleGenerativeAIEmbeddings).toHaveBeenCalledWith({
      model: 'test-model',
      apiKey: 'test-key',
    });
  });
});
