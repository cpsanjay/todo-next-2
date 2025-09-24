"use client";
import { Navbar01 } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  console.log({ user, loading, error });
  return (
    <div className={`antialiased`}>
      <Navbar01 user={user} />
      {children}
    </div>
  );
}
