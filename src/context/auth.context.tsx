"use client";
import { decodeJwt } from "@/lib/jwt";
import { token } from "@/lib/token";
import { authService } from "@/service/auth/auth.services";
import { createContext, ReactNode, useState } from "react";

interface AuthContextType {
  error: string | null;
  loading: boolean;
  token: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}
interface LoginResponse {
  access_token: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response: LoginResponse = await authService.login(email, password);

      token.set(response.access_token);

      const payload = decodeJwt(response.access_token);

      setAccessToken(response.access_token);
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await authService.register(name, email, password);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    token.clear();
    setAccessToken(null);

    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        error,
        loading,
        token: accessToken,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
