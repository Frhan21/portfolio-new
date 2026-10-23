export class InvalidQuestionError extends Error {}

export function parseQuestion(input: unknown) {
  const question =
    typeof input === 'object' && input !== null && 'question' in input
      ? (input as { question?: unknown }).question
      : undefined;

  if (typeof question !== 'string') {
    throw new InvalidQuestionError('Question must be 1–500 characters');
  }

  const value = question.trim();
  if (!value || value.length > 500) {
    throw new InvalidQuestionError('Question must be 1–500 characters');
  }
  return value;
}

export function normalizeAnswer(content: unknown): string {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return String(content ?? '');

  return content
    .map((part) =>
      typeof part === 'object' && part !== null && 'text' in part
        ? String(part.text)
        : ''
    )
    .filter(Boolean)
    .join('\n\n');
}
