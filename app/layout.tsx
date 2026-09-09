import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import QueryProvider from './providers/query-provider';
import AuthProvider from './providers/auth-provider';
import { ThemeProvider } from './providers/theme-provider';
import { poppins } from './fonts';

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
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body
        className={`antialiased bg-white text-foreground transition-colors duration-300 ease-in-out dark:bg-background dark:transition-colors dark:duration-300 dark:ease-in-out font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-right" duration={3000} />
          <AuthProvider>
            <QueryProvider>{children}</QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
