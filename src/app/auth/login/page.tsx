"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { error, loading, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }

    try {
      await login(email.trim(), password);

      router.push("/product");
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white">
          <div className="p-8 sm:p-10">
            <div className="text-center">
              <h1 className="mt-4 text-2xl font-bold text-slate-900">
                Login Belanjaku
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-800">
                  Email
                </label>

                <div className="flex items-center gap-2 rounded-2xl border bg-white px-4 py-3">
                  <span className="text-slate-400">✉️</span>

                  <input
                    type="email"
                    className="w-full outline-none text-sm text-slate-900 placeholder:text-slate-400"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-800">
                  Password
                </label>

                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <span className="text-slate-400">🔒</span>

                  <input
                    className="w-full outline-none text-sm text-slate-900 placeholder:text-slate-400"
                    type={showPass ? "text" : "password"}
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded-lg hover:bg-slate-100"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
