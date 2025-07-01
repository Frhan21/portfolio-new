import type { Metadata } from "next";

// Metadata specific to the Login page
export const metadata: Metadata = {
  title: "Login | Portfolio",
  description: "Sign in to access your portfolio account.",
};

// This layout wraps your login page
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="antialiased">{children}</section>;
}
