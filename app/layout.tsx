import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from './providers/query-provider';
import { ThemeProvider } from './providers/theme-provider';

export const metadata: Metadata = {
  title: 'M Farhan Ramadhan | Portfolio',
  description: 'Website ini adalah portfolio pribadi saya',
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
      <body className={`antialiased`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
