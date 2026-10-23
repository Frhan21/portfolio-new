import { ask } from '../../../../lib/ai/rag';
import {
  InvalidQuestionError,
  parseQuestion,
} from '../../../../lib/ai/chat-contract';
import {
  checkChatRateLimit,
  getClientIdentity,
} from '../../../../lib/ai/chat-rate-limit';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Question must be 1–500 characters' },
      { status: 400 }
    );
  }

  try {
    const question = parseQuestion(body);
    let limit;
    try {
      limit = await checkChatRateLimit(getClientIdentity(request.headers));
    } catch (error) {
      console.error('Chat rate limit failed', error);
      return NextResponse.json(
        { error: 'Chat is temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many questions. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(limit.retryAfter) },
        }
      );
    }
    const answer = await ask(question);
    return NextResponse.json({ answer });
  } catch (error) {
    if (error instanceof InvalidQuestionError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Chat request failed', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
