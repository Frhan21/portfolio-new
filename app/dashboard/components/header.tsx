import { Dispatch, FC, SetStateAction, useState } from "react";
import { Theme } from "../types/Theme";
import { Bell, ChevronDown, Menu, Moon, Search, Sun, X } from "lucide-react";

interface HeaderProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  email: string;
  theme: Theme;
  toogleTheme: () => void; 
}

const Header: FC<HeaderProps> = ({
  setIsOpen,
  name,
  email,
  theme, 
  toogleTheme,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header
        style={{ backgroundColor: theme.background }}
        className="py-4 px-6 flex items-center justify-between transition-colors duration-300"
      >
        {/* Left side: Hamburger menu (mobile) and Search (desktop) */}
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-gray-500 dark:text-gray-400"
          >
            <Menu size={24} />
          </button>
          <div className="hidden md:flex relative items-center w-full lg:w-96">
            <Search
              size={20}
              style={{ color: theme.textSecondary }}
              className="absolute left-3"
            />
            <input
              type="text"
              placeholder="Search for anything"
              style={{
                backgroundColor: theme.cardBg,
                color: theme.textPrimary,
                borderColor: theme.border,
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 transition-colors"
            />
          </div>
        </div>

        {/* Right side: Mobile search icon and other controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden text-gray-500 dark:text-gray-400"
          >
            <Search size={24} />
          </button>
          <button
            onClick={toogleTheme}
            style={{ color: theme.textPrimary }}
            className="p-2 rounded-full"
          >
            {theme.background === "#111827" ? (
              <Sun size={24} />
            ) : (
              <Moon size={24} />
            )}
          </button>
          <button style={{ color: theme.textPrimary }} className="relative">
            <Bell size={24} />
            <span
              className="absolute top-0 right-0 h-2 w-2 rounded-full"
              style={{ backgroundColor: theme.primary }}
            ></span>
          </button>
          <div className="flex items-center space-x-3">
            <img
              src="https://placehold.co/40x40/FE7743/FFFFFF?text=A"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="hidden sm:block">
              <p
                style={{ color: theme.textPrimary }}
                className="font-semibold text-sm"
              >
                {name}
              </p>
              <p style={{ color: theme.textSecondary }} className="text-xs">
                {email}
              </p>
            </div>
            <ChevronDown size={20} style={{ color: theme.textSecondary }} />
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div
          style={{ backgroundColor: theme.background }}
          className="md:hidden fixed inset-0 z-50 p-4 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ color: theme.textPrimary }} className="text-lg font-semibold">Search</h2>
            <button onClick={() => setIsSearchOpen(false)} style={{ color: theme.textPrimary }}>
              <X size={24} />
            </button>
          </div>
          <div className="relative flex-1">
            <Search
              size={20}
              style={{ color: theme.textSecondary }}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search for anything"
              autoFocus
              style={{
                backgroundColor: theme.cardBg,
                color: theme.textPrimary,
                borderColor: theme.border,
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 transition-colors"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

