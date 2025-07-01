"use client";

import { AtSign, Lock } from "lucide-react";
import { Button, Input } from "../form-control";
import AuthLayout from "../layout/auth-layout";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const err = await res.json();
        setError(err.message);
        setLoading(false);
        return;
      }

      setCookie("token", data.token)

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
        <Input
          icon={AtSign}
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between mb-6">
          <a
            href="#"
            className="text-sm text-[#FE7743] hover:underline transition-colors duration-300"
          >
            Forgot Password ?{" "}
          </a>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="text-center text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-6 transition-colors duration-300">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#FE7743] hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Page;
