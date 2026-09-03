'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import {
  APP_SETTINGS_MENUS,
  APPLICATION_MENUS,
} from '@/commons/constant/dashboard-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const isMenuActive = (pathname: string, url: string) => {
  if (url === '/dashboard') return pathname === url;
  return pathname === url || pathname.startsWith(`${url}/`);
};

export default function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-none bg-transparent [&_[data-sidebar=sidebar]]:bg-[#17232b] [&_[data-sidebar=sidebar]]:text-[#f4efe8]"
      {...props}
    >
      <SidebarHeader className="border-b border-white/8">
        <div
          className={`flex items-center gap-3 py-4 ${open ? 'px-3' : 'px-0 justify-center'}`}
        >
          <div className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_rgba(254,119,67,0.9)]">
            <BookOpen className="size-4" />
          </div>
          {open && (
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight text-white">
                Portfolio
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                Content studio
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-1 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
            {open ? 'Workspace' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {APPLICATION_MENUS.map((menu) => {
                const active = isMenuActive(pathname, menu.url);
                return (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={menu.title}
                      className="h-10 rounded-xl px-3 text-white/65 transition-colors hover:bg-white/7 hover:text-white data-[active=true]:bg-primary data-[active=true]:font-semibold data-[active=true]:text-primary-foreground data-[active=true]:shadow-[0_10px_28px_-16px_rgba(254,119,67,0.9)]"
                    >
                      <Link
                        href={menu.url}
                        className="flex items-center gap-2.5"
                      >
                        <menu.icon className="size-4 shrink-0" />
                        <span className="truncate text-sm font-medium">
                          {menu.title}
                        </span>
                        {open && active && (
                          <span className="ml-auto size-1.5 rounded-full bg-current" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Menu */}
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
            {open ? 'Settings' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {APP_SETTINGS_MENUS.map((menu) => {
                const active = isMenuActive(pathname, menu.url);
                return (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={menu.title}
                      className="h-10 rounded-xl px-3 text-white/65 transition-colors hover:bg-white/7 hover:text-white data-[active=true]:bg-primary data-[active=true]:font-semibold data-[active=true]:text-primary-foreground"
                    >
                      <Link
                        href={menu.url}
                        className="flex items-center gap-2.5"
                      >
                        <menu.icon className="size-4 shrink-0" />
                        <span className="truncate text-sm font-medium">
                          {menu.title}
                        </span>
                        {open && active && (
                          <span className="ml-auto size-1.5 rounded-full bg-current" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {open && (
        <SidebarFooter className="border-t border-white/8 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 text-xs font-medium text-white/60 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            View portfolio
            <ArrowUpRight className="size-3.5" />
          </Link>
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  );
}
