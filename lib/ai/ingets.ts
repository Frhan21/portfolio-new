import { createHash } from 'node:crypto';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export type IngestInput = {
  title: string;
  content: string;
  sourceType?: 'text' | 'pdf';
};

type IngestAdapters = {
  reserve(hash: string): Promise<boolean>;
  release(hash: string): Promise<unknown>;
  complete(hash: string): Promise<unknown>;
  add(documents: Document[]): Promise<unknown>;
};

export function normalizeKnowledge(content: string) {
  return content.replace(/\s+/g, ' ').trim();
}

async function defaultAdapters(): Promise<IngestAdapters> {
  const [{ default: prisma }, { vectorStore }] = await Promise.all([
    import('@/lib/prisma'),
    import('./vector-store'),
  ]);
  return {
    reserve: async (hash) => {
      const inserted = await prisma.$executeRaw`
        INSERT INTO knowledge_sources (hash, status, created_at, updated_at)
        VALUES (${hash}, 'processing', NOW(), NOW())
        ON CONFLICT (hash) DO UPDATE SET updated_at = NOW()
        WHERE knowledge_sources.status = 'processing'
          AND knowledge_sources.updated_at < NOW() - INTERVAL '30 minutes'
      `;
      return inserted === 1;
    },
    release: (hash) =>
      prisma.$executeRaw`DELETE FROM knowledge_sources WHERE hash = ${hash} AND status = 'processing'`,
    complete: (hash) =>
      prisma.$executeRaw`UPDATE knowledge_sources SET status = 'complete' WHERE hash = ${hash}`,
    add: async (documents) => (await vectorStore()).addDocuments(documents),
  };
}

export async function ingestKnowledge(
  input: IngestInput,
  adapters?: IngestAdapters
) {
  const content = normalizeKnowledge(input.content);
  if (!input.title.trim() || !content)
    throw new Error('Title and content are required');

  const hash = createHash('sha256').update(content).digest('hex');
  const deps = adapters ?? (await defaultAdapters());
  if (!(await deps.reserve(hash))) return { status: 'duplicate' as const };

  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunks = await splitter.splitDocuments([
      new Document({
        pageContent: content,
        metadata: {
          source: input.title.trim(),
          sourceType: input.sourceType ?? 'text',
        },
      }),
    ]);
    await deps.add(chunks);
    await deps.complete(hash);
    return { status: 'ingested' as const, chunks: chunks.length };
  } catch (error) {
    await deps.release(hash);
    throw error;
  }
}

export async function ingestData(file: File) {
  const pages = await new PDFLoader(file).load();
  return ingestKnowledge({
    title: file.name,
    content: pages.map((page) => page.pageContent).join('\n'),
    sourceType: 'pdf',
  });
}
