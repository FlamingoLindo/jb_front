import React from "react";

const mockUsers = [
  { name: "Joaquim Silva", email: "joaquim.silva@gmail.com", tipo: "Admin" },
  { name: "Bruna Costa", email: "bruna.costa@email.com", tipo: "User" },
  { name: "Carlos Mendes", email: "carlos.mendes@empresa.com", tipo: "User" },
];

export default function Users() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          + Adicionar usuário
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-6 py-3 border-b">Nome</th>
              <th className="px-6 py-3 border-b">E-mail</th>
              <th className="px-6 py-3 border-b">Tipo</th>
              <th className="px-6 py-3 border-b">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {mockUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{user.name}</td>
                <td className="px-6 py-4 border-b">{user.email}</td>
                <td className="px-6 py-4 border-b">{user.tipo}</td>
                <td className="px-6 py-4 border-b">
                  <button className="font-bold text-blue-500 hover:text-blue-700 transition">
                    Editar
                  </button>
                  <button className="font-bold text-red-500 hover:text-red-700 transition ml-4">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
