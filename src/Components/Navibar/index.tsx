"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FaDollarSign, FaProductHunt, FaUser, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const navItems = [
  { href: "/dashboard/brands", label: "Marcas", icon: FaProductHunt },
  { href: "/dashboard/table", label: "Tabela de valores", icon: FaDollarSign },
  { href: "/dashboard/users", label: "Usuários", icon: FaUser },
];

export default function NaviBar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    toast.success("Você saiu com sucesso!");
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 h-screen w-[220px] bg-white/90 backdrop-blur border-r border-gray-200 shadow-lg rounded-r-2xl p-4 flex flex-col items-center">
      {/* Logo */}
      <Image src="/favicon.png" alt="logo" width={80} height={80} priority />

      {/* Navigation links */}
      <ul className="w-full flex flex-col gap-1 mt-6">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-sm transition-colors hover:bg-gray-100 ${active ? "text-blue-600" : "text-gray-700"}`}
              >
                {/* Left accent bar when active */}
                {active && (
                  <span className="absolute -left-4 h-full w-1 rounded-r-lg bg-blue-600" />
                )}

                <Icon className="shrink-0" size={18} />
                <span className="whitespace-nowrap">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Spacer to push logout button to the bottom */}
      <div className="flex-grow" />

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium mb-4 cursor-pointer"
      >
        <FaSignOutAlt size={18} />
        Sair
      </button>
    </nav>
  );
}
