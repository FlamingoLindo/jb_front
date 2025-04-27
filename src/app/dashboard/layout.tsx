'use client'

import type { Metadata } from "next";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import "../globals.css";

import NaviBar from "@/Components/Navibar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);


  return (
    <>
      <NaviBar />
      <div
        style={{
          marginLeft: "220px",
          padding: "1rem",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </>
  );
}
