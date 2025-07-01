import { Dispatch, FC, SetStateAction } from "react";
import { Theme } from "../types/Theme";
import { Home, List, X } from "lucide-react";
import NavLink from "./nav-link";
import LogoutButton from "./buttons/logout";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  theme: Theme;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, setIsOpen, theme }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        style={{ backgroundColor: theme.sidebarBg }}
        className={`fixed top-0 left-0 h-full w-64 text-white p-6 flex flex-col z-40 transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
            title="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1">
          <NavLink
            href="/dashboard"
            icon={<Home size={20} />}
            active
            theme={theme}
          >
            Home
          </NavLink>
          <NavLink href="/dashboard" icon={<List size={20} />} theme={theme}>
            Posts
          </NavLink>
        </nav>
        <div>
          <LogoutButton theme={theme} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
