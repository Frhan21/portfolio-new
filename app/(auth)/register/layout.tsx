import type { Metadata } from "next";

// Metadata specific to the Register page
export const metadata: Metadata = {
  title: "Register | Portfolio",
  description: "Create a new account for your portfolio.",
};

// This layout wraps your register page
export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="antialiased">{children}</section>;
}
