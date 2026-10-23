import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
const embeddings = new GoogleGenerativeAIEmbeddings({
  model: process.env.EMBEDDING_MODEL_TYPE,
  apiKey: process.env.GOOGLE_API_KEY,
});

export default embeddings;
