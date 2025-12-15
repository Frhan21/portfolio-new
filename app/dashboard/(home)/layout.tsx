'use client';

import { useEffect, useState } from 'react';
import { User } from '../types/User';
import Header from '../components/header';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { decodetoken } from '@/lib/jwt';
import { useDashboard } from '../context/DashboardContext'; // <-- Import custom hook
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomeGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ambil state dan fungsi dari context, bukan lagi dari state lokal
  const { theme, toggleTheme, setIsSidebarOpen } = useDashboard();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      const tokenValue = getCookie('token');
      const token = typeof tokenValue === 'string' ? tokenValue : '';

      if (!token) {
        router.push('/login');
        return;
      }

      const decoded = decodetoken(token);
      if (!decoded || !decoded.userId) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch(`/api/v1/user/${decoded.userId}`);
        if (!res.ok) {
          throw new Error('User not found or failed to fetch');
        }
        const { data } = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [router]);

  if (loading) {
    return (
      <section
        style={{ backgroundColor: theme.background }}
        className="flex min-h-screen flex-col items-center justify-center"
      >
        <LoadingSpinner size={64} color={theme.primary} />
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header sekarang menggunakan state dari context */}
      <Header
        setIsOpen={setIsSidebarOpen}
        theme={theme}
        toogleTheme={toggleTheme}
        name={user.name ?? ''}
        email={user.email ?? ''}
      />
      <div className="p-6">{children}</div>
    </div>
  );
}
