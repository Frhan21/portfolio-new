"use client";

import { FC, Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Theme } from "../types/Theme";
import { Home, List, X } from "lucide-react";
import LogoutButton from "./buttons/logout"; // Asumsi komponen ini ada
import { MdCategory } from "react-icons/md";

// Definisikan props untuk Sidebar
interface SidebarProps {
  theme: Theme;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ theme, isOpen, setIsOpen }) => {
  const pathname = usePathname();

  // Fungsi untuk menutup sidebar, bisa dipanggil dari beberapa tempat
  const closeSidebar = () => setIsOpen(false);

  const navLinks = [
    {
      name: "Home",
      href: "/dashboard",
      icon: <Home size={20} />,
      active: pathname === "/dashboard",
    },
    {
      name: "Posts",
      href: "/dashboard/posts",
      icon: <List size={20} />,
      active: pathname.startsWith("/dashboard/posts"),
    },
    {
      name: "Category", 
      href: "/dashboard/category",
      icon: <MdCategory size={20} />,
      active: pathname.startsWith("/dashboard/category"),
    }
  ];

  return (
    <>
      {/* Overlay untuk background saat sidebar terbuka di mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      ></div>

      {/* Konten Sidebar */}
      <aside
        style={{ backgroundColor: theme.sidebarBg }}
        className={`fixed top-0 left-0 h-full w-64 text-white p-6 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${
          // Sidebar akan terlihat di desktop (lg) dan saat isOpen true di mobile
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          {/* Tombol close hanya muncul di mobile */}
          <button
            onClick={closeSidebar}
            className="lg:hidden text-white hover:text-gray-300"
            title="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeSidebar} // Menutup sidebar saat link di-klik di mobile
              className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                link.active
                  ? `bg-[${theme.primary}]`
                  : "hover:bg-white/10"
              }`}
            >
              {link.icon}
              <span className="ml-4 font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Tombol Logout di bagian bawah */}
        <div>
          <LogoutButton theme={theme} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
