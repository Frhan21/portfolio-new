import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { loadPdfDocuments, loadPortfolioDocuments } from './file-loader';
import llm from './llm';
import { SYSTEM_PROMPT } from './prompt';
import { vectorStore } from './vector-store';
import { normalizeAnswer } from './chat-contract';

export async function indexPortfolioKnowledge() {
  const store = await vectorStore();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const documents = [
    ...(await loadPdfDocuments()),
    ...(await loadPortfolioDocuments()),
  ];
  const chunks = await splitter.splitDocuments(documents);

  await store.addDocuments(chunks);
  return chunks.length;
}

export const ask = async (question: string) => {
  const store = await vectorStore();
  const documents = await store.asRetriever({ k: 4 }).invoke(question);
  const context = documents
    .map(
      (document, index) => `
[Source ${index + 1}: ${document.metadata.source}
${document.pageContent}`
    )
    .join('\n\n');

  const response = await llm.invoke([
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Context:\n${context}\n\nQuestion:\n${question}`,
    },
  ]);

  return normalizeAnswer(response.content);
};
