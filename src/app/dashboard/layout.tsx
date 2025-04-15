import type { Metadata } from "next";
import "../globals.css";

import NaviBar from "@/Components/Navibar";

export const metadata: Metadata = {
  title: "Dashboard | JB Ferros e Aços",
  description: "Painel de controle da loja de ferros e aços",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
