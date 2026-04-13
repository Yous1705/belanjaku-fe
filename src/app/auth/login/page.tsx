"use client";
import { decodeJwt } from "@/api/jwt";
import { login } from "@/api/services/auth/auth.services";
import { token } from "@/api/token";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function loginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!password) {
      alert("Password wajib diisi.");
    }

    try {
      setLoading(true);
      const res = await login(email.trim(), password);
      token.set(res.access_token);
      const payload = decodeJwt(res.access_token);

      router.push(`/dashboard`);
      router.refresh();
    } catch (e: any) {
      alert(e?.message ?? "Login gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className=" w-full max-w-md">
        <div className="rounded-3xl border border-slate-200">
          <div className=" p-8 sm:p-10">
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
              </div>
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-800">
                  Password
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-400">
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

              <button
                type="submit"
                className="w-full rounded-2xl px-4 py-3 text-sm font-semibold transition shadow-sm hover:bg-blue-400"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loginPage;
