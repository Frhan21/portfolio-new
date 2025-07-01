import { LucideIcon } from "lucide-react";
import {
  ButtonHTMLAttributes,
  FC,
  InputHTMLAttributes,
  ReactNode,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export const Input: FC<InputProps> = ({ icon: Icon, ...props }) => (
  <div className="relative mb-4">
    {Icon && (
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF]" />
    )}
    <input
      className="w-full bg-[#F8F9FA] dark:bg-[#111827] text-[#1F2937] dark:text-[#F9FAFB] border border-gray-200 dark:border-gray-700 rounded-lg py-3 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE7743]/50 transition-all duration-300"
      style={{ paddingLeft: Icon ? "2.5rem" : "0.75rem" }}
      {...props}
    />
  </div>
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="w-full bg-[#FE7743] text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
};
