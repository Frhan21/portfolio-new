import { auth } from '@/lib/auth';
import { ingestData, ingestKnowledge } from '@/lib/ai/ingets';
import { NextResponse } from 'next/server';

const MAX_PDF_SIZE = 10 * 1024 * 1024;

export const POST = auth(async function POST(request) {
  if (!request.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const type = formData.get('type');
    let result;

    if (type === 'text') {
      result = await ingestKnowledge({
        title: String(formData.get('title') ?? ''),
        content: String(formData.get('content') ?? ''),
      });
    } else if (type === 'pdf') {
      const files = formData.getAll('file');
      const file = files[0];
      if (
        files.length !== 1 ||
        !(file instanceof File) ||
        file.type !== 'application/pdf'
      ) {
        return NextResponse.json(
          { error: 'Valid PDF is required' },
          { status: 400 }
        );
      }
      if (file.size > MAX_PDF_SIZE) {
        return NextResponse.json(
          { error: 'PDF must be 10 MB or smaller' },
          { status: 400 }
        );
      }
      result = await ingestData(file);
    } else {
      return NextResponse.json(
        { error: 'Type must be text or pdf' },
        { status: 400 }
      );
    }

    if (result.status === 'duplicate') {
      return NextResponse.json(
        { status: 'duplicate', message: 'Knowledge already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json({ ...result, message: 'Knowledge ingested' });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Title and content are required'
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Knowledge ingestion failed', error);
    return NextResponse.json(
      { error: 'Failed to ingest data' },
      { status: 500 }
    );
  }
});
