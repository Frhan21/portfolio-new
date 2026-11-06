import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

// Lazy init: route import saat build tidak boleh butuh GOOGLE_API_KEY.
let embeddings: GoogleGenerativeAIEmbeddings | undefined;

export function getEmbeddings() {
  if (!embeddings) {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY belum dikonfigurasi');
    }
    embeddings = new GoogleGenerativeAIEmbeddings({
      model: process.env.EMBEDDING_MODEL_TYPE,
      apiKey: process.env.GOOGLE_API_KEY,
    });
  }
  return embeddings;
}
