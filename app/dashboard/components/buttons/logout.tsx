"use client";

import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Theme } from "../../types/Theme";
import { FC } from "react";

interface LogoutButton {
  theme: Theme;
}

const LogoutButton: FC<LogoutButton> = ({ theme }) => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("token");
    router.push("/");
  };

  return (
    <div>
      <form action={handleLogout}>
        <Button
          className={`p-6 my-1 w-full rounded-lg transition-colors duration-300 cursor-pointer`}
          style={{ backgroundColor: theme.primary }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </form>
    </div>
  );
};

export default LogoutButton;
