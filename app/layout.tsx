import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import QueryProvider from './providers/query-provider';
import { ThemeProvider } from './providers/theme-provider';

export const metadata: Metadata = {
  title: 'M Farhan Ramadhan | Portfolio',
  description: 'This is my personal portfolio website',
  icons: {
    icon: '/icon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-white text-foreground transition-colors duration-300 ease-in-out dark:bg-background dark:transition-colors dark:duration-300 dark:ease-in-out`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster
            toastOptions={{
              classNames: {
                success: 'bg-green-100 text-green-800 border border-green-800',
                error: 'bg-red-100 text-red-800 border border-red-800',
              },
            }}
          />
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
