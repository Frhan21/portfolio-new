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
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col flex-1 w-full min-h-screen">
        <DashboardHeader />
        <div className="flex-1 overflow-auto bg-background">
          {/* Breadcrumbs bar */}
          <div className="border-b border-border/60 bg-card px-4 md:px-6 py-2.5">
            <Breadcrumbs />
          </div>
          {/* Page content */}
          <div className="p-4 md:p-6">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
