'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

const suggestions = [
  'Ceritakan tentang Farhan',
  'Apa proyek yang pernah dibuat?',
  'Apa pengalaman dan keahliannya?',
];

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
};

export default function FloatingChat() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [validationError, setValidationError] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (wasOpen.current) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [messages, pending]);

  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/'))
    return null;

  async function send(value: string) {
    const text = value.trim();
    if (!text || text.length > 500) {
      setValidationError('Question must be 1–500 characters');
      return;
    }
    if (pending) return;
    setValidationError('');

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', content: text },
    ]);
    setQuestion('');
    setPending(true);

    try {
      const response = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || typeof result?.answer !== 'string') {
        throw new Error(
          response.status === 429
            ? 'Question limit reached. Please try again later.'
            : 'Chat is temporarily unavailable. Please try again.'
        );
      }
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: 'assistant', content: result.answer },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            error instanceof Error
              ? error.message
              : 'Chat is temporarily unavailable. Please try again.',
          error: true,
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void send(question);
  }

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[70] sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-labelledby="chat-title"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.72, x: 36, y: 56 }
            }
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.72, x: 36, y: 56 }
            }
            transition={{
              type: 'spring',
              stiffness: 360,
              damping: 30,
              mass: 0.8,
            }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed inset-x-3 bottom-3 top-3 flex flex-col overflow-hidden rounded-2xl bg-background text-foreground shadow-2xl sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(650px,calc(100dvh-3rem))] sm:w-[400px]"
          >
            <header className="flex items-center gap-3 bg-card px-5 py-4 text-card-foreground">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="chat-title" className="font-semibold">
                  Ask about Farhan
                </h2>
                <p className="text-xs text-muted-foreground">
                  Portfolio assistant
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Close chat"
              >
                <X className="size-5" />
              </button>
            </header>

            <div
              ref={listRef}
              data-lenis-prevent
              className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 touch-pan-y sm:px-5"
            >
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-6">
                Halo! Saya dapat membantu menjawab pertanyaan tentang profil,
                proyek, dan pengalaman Farhan.
              </div>

              {messages.length === 0 && (
                <div className="space-y-2 pt-1">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={pending}
                      onClick={() => void send(suggestion)}
                      className="block w-full rounded-xl bg-background px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`w-fit max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === 'user'
                      ? 'ml-auto rounded-tr-sm bg-primary text-primary-foreground'
                      : message.error
                        ? 'rounded-tl-sm bg-destructive text-destructive-foreground'
                        : 'rounded-tl-sm bg-muted'
                  }`}
                >
                  {message.role === 'assistant' && !message.error ? (
                    <ReactMarkdown
                      skipHtml
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="my-2 list-disc space-y-1 pl-5">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="my-2 list-decimal space-y-1 pl-5">
                            {children}
                          </ol>
                        ),
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-2"
                          >
                            {children}
                          </a>
                        ),
                        code: ({ children }) => (
                          <code className="rounded bg-background px-1 py-0.5 text-xs">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
              ))}

              {pending && (
                <div
                  className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-4"
                  aria-label="Assistant is thinking"
                >
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="size-1.5 animate-pulse rounded-full bg-muted-foreground motion-reduce:animate-none"
                      style={{ animationDelay: `${dot * 150}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={submit}
              className="bg-background p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] sm:p-4"
            >
              <p role="status" className="sr-only">
                {pending
                  ? 'Assistant is thinking'
                  : validationError || messages.at(-1)?.content}
              </p>
              {validationError && (
                <p className="mb-2 text-xs font-medium text-destructive">
                  {validationError}
                </p>
              )}
              <div className="flex items-end gap-2 rounded-2xl bg-muted p-2 pl-4 focus-within:outline-2 focus-within:outline-primary">
                <textarea
                  ref={inputRef}
                  value={question}
                  onChange={(event) => {
                    setQuestion(event.target.value.slice(0, 500));
                    setValidationError('');
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  rows={1}
                  maxLength={500}
                  disabled={pending}
                  placeholder="Ask a question..."
                  aria-label="Question"
                  className="max-h-28 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={pending || !question.trim()}
                  aria-label="Send question"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close portfolio chat' : 'Open portfolio chat'}
        className={`size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${open ? 'hidden' : 'flex'}`}
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
