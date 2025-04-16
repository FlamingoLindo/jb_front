import React from "react";
import Link from "next/link";

import { FaDollarSign, FaProductHunt, FaUser } from "react-icons/fa";
import Image from "next/image";

export default function NaviBar() {
  return (
    <nav className="fixed top-0 left-0 w-[220px] h-screen bg-white text-black p-4 box-border overflow-y-auto rounded-r-lg border-r-2 border-black">
      <div className="flex justify-center mb-4">
        <Image src="/favicon.png" alt="logo" width={100} height={100} />
      </div>

      <ul className="list-none m-0 p-0">
        <li className="mb-4">
          <Link
            href="/dashboard/brands"
            className="flex items-center p-2 rounded-md hover:bg-gray-200 transition"
          >
            <FaProductHunt className="mr-2" />
            <span>Marcas</span>
          </Link>
        </li>

        <li className="mb-4">
          <Link
            href="/dashboard/table"
            className="flex items-center p-2 rounded-md hover:bg-gray-200 transition"
          >
            <FaDollarSign className="mr-2" />
            <span>Tabela de valores</span>
          </Link>
        </li>

        <li className="mb-4">
          <Link
            href="/dashboard/users"
            className="flex items-center p-2 rounded-md hover:bg-gray-200 transition"
          >
            <FaUser className="mr-2" />
            <span>Usuários</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
