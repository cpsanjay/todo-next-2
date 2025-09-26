"use client";
import { Navbar01 } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`antialiased`}>
      <Navbar01 />
      {children}
    </div>
  );
}
