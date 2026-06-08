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
import { BookOpen, ChevronRight } from 'lucide-react';
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
    <Sidebar collapsible="icon" {...props}>
      {/* Header / Logo */}
      <SidebarHeader className="border-b border-sidebar-border">
        <div
          className={`flex items-center gap-3 py-4 ${open ? 'px-3' : 'px-0 justify-center'}`}
        >
          <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <BookOpen className="size-4" />
          </div>
          {open && (
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-sm text-sidebar-foreground">
                Portfolio
              </span>
              <span className="text-[11px] text-sidebar-foreground/50 font-medium uppercase tracking-widest">
                Admin
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        {/* Application Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.15em] text-sidebar-foreground/40 px-3 mb-1">
            {open ? 'Menu' : '—'}
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
                          <ChevronRight className="ml-auto size-3.5 opacity-60" />
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
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.15em] text-sidebar-foreground/40 px-3 mb-1">
            {open ? 'Settings' : '—'}
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
                          <ChevronRight className="ml-auto size-3.5 opacity-60" />
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

      {/* Footer version tag */}
      {open && (
        <SidebarFooter className="border-t border-sidebar-border px-4 py-3">
          <span className="text-[11px] text-sidebar-foreground/30 font-medium">
            v1.0.0 · Portfolio CMS
          </span>
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  );
}
