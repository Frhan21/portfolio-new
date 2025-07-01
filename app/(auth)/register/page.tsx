"use client";

import { AtSign, Lock, User } from "lucide-react";
import { Button, Input } from "../component/form-control";
import AuthLayout from "../component/layout/auth-layout";
import Link from "next/link";
import { useState } from "react";
import { userSchema } from "@/libs/validation";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Ubah state error menjadi objek untuk error per-field
  const [errors, setErrors] = useState<Record<string, string>>({});
  // State terpisah untuk error level form (misal: dari API)
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setFormError(null);
    setIsLoading(true);

    try {
      // 1. Validasi di sisi client terlebih dahulu
      if (password !== confirmPassword) {
        // Set error spesifik untuk field confirmPassword
        setErrors({ confirmPassword: "Passwords do not match." });
        return;
      }
      const validation = userSchema.safeParse({ name, email, password });
      if (!validation.success) {
        // Ubah array error dari Zod menjadi objek error
        const fieldErrors: Record<string, string> = {};
        for (const issue of validation.error.issues) {
          fieldErrors[issue.path[0]] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }

      // 2. Kirim request ke API
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      // 3. Periksa apakah respons dari API berhasil (status 2xx)
      if (!response.ok) { // Ini adalah respons dari API registrasi
        // Jika tidak, ambil pesan error dari body respons API
        const errorData = await response.json();
        setFormError(
          errorData.message || "Registration failed. Please try again."
        );
        return;
      }

      // 4. Jika registrasi berhasil, coba untuk login secara otomatis
      const loginResponse = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await loginResponse.json()

      setCookie('token', data.token)

      // 5. Jika login berhasil, arahkan langsung ke dashboard
      router.push("/dashboard");
    } catch (error: any) {
      // Blok ini hanya untuk error jaringan (misal: server tidak bisa dihubungi)
      setFormError("A network error occurred. Please try again later.");
    } finally {
      // Selalu hentikan loading, baik berhasil maupun gagal
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account">
      <div>
        {formError && (
          <div className="mx-auto my-3 bg-red-500 w-full rounded-lg px-4 py-2 text-white">
            <p>{formError}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {errors.name && (
            <p className="text-sm text-red-500 mb-1">{errors.name}</p>
          )}
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-sm text-red-500 mb-1 mt-4">{errors.email}</p>
          )}
          <Input
            icon={AtSign}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-sm text-red-500 mb-1 mt-4">{errors.password}</p>
          )}
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mb-1 mt-4">
              {errors.confirmPassword}
            </p>
          )}
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="mt-8">
            <Button type="submit" disabled={isLoading} >
              {isLoading ? "Processing..." : "Sign Up"}
            </Button>
          </div>
        </form>
        <p className="text-center text-sm text-[#6B7280] dark:text-[#9ca3af] mt-6 transition-colors duration-300 hover:text-primary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#FE7743] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
