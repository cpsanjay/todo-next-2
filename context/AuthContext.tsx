"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setError("");
      try {
        const res = await fetch("/api/user/me", { credentials: "include" });
        if (!res.ok) {
          setError("Error signing in");
        }
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        setUser(null);
        setError("Error signing in");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
