import { Dispatch, FC, SetStateAction } from "react";
import { Theme } from "../types/Theme";
import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";

interface HeaderProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  theme: Theme;
  toogleTheme: () => void;
  name: string;
  email: string;
}

const Header: FC<HeaderProps> = ({
  setIsOpen,
  theme,
  toogleTheme,
  name,
  email,
}) => {
  return (
    <header
      style={{ backgroundColor: theme.background }}
      className="py-4 px-6 flex items-center justify-between transition-colors duration-300"
    >
      <button
        onClick={() => setIsOpen(true)}
        style={{ color: theme.textPrimary }}
        className="lg:hidden"
      >
        <Menu size={28} />
      </button>
      <div className="hidden md:flex relative items-center w-1/3">
        <Search
          size={28}
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
      <div className="flex items-center space-x-6">
        <button
          onClick={toogleTheme}
          style={{ color: theme.textPrimary }}
          className="p-2 rounded-full"
        >
          {theme.background === "#111827" ? (
            <Sun size={28} />
          ) : (
            <Moon size={28} />
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
  );
};

export default Header;
