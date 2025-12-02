"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Briefcase,
  Home,
  LayoutDashboard,
  LogOut,
  Medal,
  Settings,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLeftArrow } from "react-icons/bi";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onNavigate: (itemId: string) => void;
}

interface MenuItem {
  id: string;
  icon: React.ComponentType<{ size?: number | string }>;
  label: string;
  pageUrl: string;
}

// --- DATA MENU ---
export const MENU_ITEMS: MenuItem[] = [
  {
    id: "Project",
    icon: LayoutDashboard,
    label: "Project",
    pageUrl: "/projects",
  },
  {
    id: "Analytics",
    icon: BarChart3,
    label: "Analitik",
    pageUrl: "/analytics",
  },
  { id: "Team", icon: Users, label: "Tim", pageUrl: "/team" },
  { id: "Settings", icon: Settings, label: "Pengaturan", pageUrl: "/settings" },
  {
    id: "Experience",
    icon: Briefcase,
    label: "Pengalaman",
    pageUrl: "/experience",
  },
  {
    id: "Certificate",
    icon: Medal,
    label: "Sertifikat",
    pageUrl: "/certificate",
  },
];

// --- SUB-COMPONENT: SIDEBAR ---
const Sidebar = ({ isOpen, onClose, activeItem, onNavigate }: SidebarProps) => {
  const router = useRouter();

  const handleMenuClick = (item: MenuItem) => {
    onNavigate(item.id);
    router.push(item.pageUrl);
  };

  return (
    <>
      {/* Overlay Hitam untuk Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-72 bg-white border-r border-border shadow-lg md:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col justify-between
        `}
      >
        <div className="flex-1 flex flex-col">
          {/* Bagian Atas: Logo */}
          <div className="h-20 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="px-10 py-3 w-full rounded-2xl bg-primary/10 text-primary font-semibold text-xl flex items-center justify-center">
                myPortfolio
              </div>
            </div>
            {/* Tombol Close Mobile */}
            <button
              onClick={onClose}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Bagian Tengah: Menu Navigasi */}
          <nav className="flex-1 p-4 space-y-3">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMenuClick(item)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-md font-medium transition-all
                    ${
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Profil Pengguna + Tombol Keluar */}
        <div className="p-4 space-y-3">
          <Button
            variant="default"
            asChild
            className="w-full justify-start gap-2 text-sidebar-accent-foreground hover:text-destructive text-lg px-4 py-6 mx-auto flex hover:bg-accent border-primary border-2"
          >
            <Link href={"/"}>
              <Home size={32} />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
