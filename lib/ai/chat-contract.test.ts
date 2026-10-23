import { describe, expect, it } from 'vitest';
import { normalizeAnswer, parseQuestion } from './chat-contract';

describe('chat contract', () => {
  it('trims a valid question', () => {
    expect(parseQuestion({ question: '  Apa proyek terbaru?  ' })).toBe(
      'Apa proyek terbaru?'
    );
  });

  it.each([
    {},
    { question: '' },
    { question: '   ' },
    { question: 42 },
    { question: 'a'.repeat(501) },
  ])('rejects invalid question %#', (input) => {
    expect(() => parseQuestion(input)).toThrow(
      'Question must be 1–500 characters'
    );
  });

  it('normalizes structured model content into text', () => {
    expect(
      normalizeAnswer([
        { type: 'text', text: 'First paragraph.' },
        { type: 'text', text: 'Second paragraph.' },
      ])
    ).toBe('First paragraph.\n\nSecond paragraph.');
  });
});
