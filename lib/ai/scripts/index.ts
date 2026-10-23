import { indexPortfolioKnowledge } from '../rag';

async function main() {
  try {
    console.log('Start embedding data ...');
    const totalChunks = await indexPortfolioKnowledge();
    console.log('Embedding data completed. Total chunks indexed:', totalChunks);
  } catch (error) {
    console.error('Failed to embed data', error);
    process.exit(1);
  }
}

main();
