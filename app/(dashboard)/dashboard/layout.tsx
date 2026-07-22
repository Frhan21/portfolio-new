import { SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import DashboardSidebar from '../component/dashboard-sidebar';
import DashboardHeader from '../component/dashboard-header';
import Breadcrumbs from '../component/breadcrumbs';

export const metadata: Metadata = {
  title: {
    template: '%s | Dashboard Portfolio', // %s = judul dari halaman anak
    default: 'Dashboard | Portfolio', // fallback jika halaman tidak set title
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="dashboard-shell bg-[var(--dashboard-canvas)] text-foreground">
      <DashboardSidebar />
      <main
        id="dashboard-content"
        className="min-h-svh w-full min-w-0 flex-1 md:p-2 md:pl-0"
      >
        <div className="flex min-h-svh flex-col overflow-hidden bg-[var(--dashboard-canvas)] md:min-h-[calc(100svh-1rem)] md:rounded-2xl md:border md:border-border/70 md:shadow-[0_18px_60px_-42px_rgba(31,41,55,0.45)]">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <div className="border-b border-border/60 px-4 py-3 sm:px-6 lg:px-8">
              <Breadcrumbs />
            </div>
            <div className="mx-auto w-full max-w-[1500px] p-4 pb-10 sm:p-6 lg:p-8 lg:pb-12">
              {children}
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
