import { ChatOpenAI } from '@langchain/openai';
const llm = new ChatOpenAI({
  apiKey: process.env.OPENCODE_API_KEY,
  model: process.env.CHAT_MODEL_TYPE,
  temperature: 0.5,

  configuration: {
    baseURL: process.env.OPENCODE_BASE_URL,
    defaultHeaders: {
      'x-opencode-session': process.env.OPENCODE_API_KEY,
    },
  },
});

export default llm;
