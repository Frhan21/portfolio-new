'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut, User, Sun, Moon, PanelLeft } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { logoutAction } from '@/server/actions/auth.actions';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function DashboardHeader() {
  const { data: session } = useSession();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(handle);
  }, []);

  const handleLogOut = async () => {
    await logoutAction();
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b border-border/60 bg-[var(--dashboard-canvas)] px-4 sm:px-6 lg:px-8">
      <SidebarTrigger className="-ml-2 size-9 rounded-lg text-muted-foreground transition-colors hover:bg-[var(--dashboard-surface)] hover:text-foreground">
        <PanelLeft className="size-4" />
        <span className="sr-only">Toggle sidebar</span>
      </SidebarTrigger>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold tracking-tight">
          Portfolio CMS
        </p>
        <p className="hidden text-xs text-muted-foreground sm:block">
          Manage the work shown on your public site
        </p>
      </div>

      <div className="flex items-center gap-2">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
            className="h-9 w-9 rounded-lg border border-border/70 bg-[var(--dashboard-surface)] text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle color theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-10 items-center gap-2 rounded-xl border border-border/70 bg-[var(--dashboard-surface)] px-2.5 transition-colors hover:bg-muted"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <User className="h-3.5 w-3.5" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground">
                {session?.user?.name ?? 'User'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-foreground">
                {session?.user?.name ?? 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {session?.user?.email ?? ''}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
              onClick={handleLogOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
