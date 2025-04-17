"use client";

import React from "react";
import { Trash2, Pencil } from "lucide-react";

type User = {
  name: string;
  email: string;
  tipo: "Admin" | "User";
};

const mockUsers: User[] = [
  { name: "Joaquim Silva", email: "joaquim.silva@gmail.com", tipo: "Admin" },
  { name: "Bruna Costa", email: "bruna.costa@email.com", tipo: "User" },
  { name: "Carlos Mendes", email: "carlos.mendes@empresa.com", tipo: "User" },
];

export default function Users() {
  return (
    <section className="p-4">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition">
          + Adicionar usuário
        </button>
      </header>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="text-xs font-medium text-gray-500 uppercase bg-gray-50 text-left">
            <tr>
              <th scope="col" className="px-6 py-3">Nome</th>
              <th scope="col" className="px-6 py-3">E-mail</th>
              <th scope="col" className="px-6 py-3">Tipo</th>
              <th scope="col" className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {mockUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.tipo}</td>
                <td className="px-6 py-4 flex items-center justify-center gap-4">
                  <button aria-label="Visualizar" className="text-gray-500 hover:text-gray-700 transition">
                    <Pencil size={18} />
                  </button>
                  <button aria-label="Excluir" className="text-gray-500 hover:text-red-600 transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
