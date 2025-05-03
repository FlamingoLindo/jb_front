"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";

import { getUsers, searchUsers, updateUserStatus } from "@/services/api";
import type { User, Paginated } from "@/interfaces";
import ToggleSwitch from "@/Components/ToggleSwitch";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // pagination & search state
  const [page, setPage] = useState(1);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Stable loader with useCallback
  const loadPage = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      try {
        const data: Paginated<User> = searchTerm
          ? await searchUsers(searchTerm, pageNum)
          : await getUsers(pageNum);

        setUsers(data.results);
        setNext(data.next);
        setPrevious(data.previous);
      } catch (err) {
        toast.error("Erro ao carregar usuários.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [searchTerm]
  );

  // Fetch on page or searchTerm change
  useEffect(() => {
    loadPage(page);
  }, [page, loadPage]);

  const handleToggle = async (id: number, newState: boolean) => {
    // optimistic update
    setUsers((u) =>
      u.map((user) =>
        user.id === id ? { ...user, is_active: newState } : user
      )
    );
    try {
      await updateUserStatus(id);
      toast.success(`Usuário ${newState ? "ativado" : "desativado"}!`);
    } catch (err) {
      // rollback
      setUsers((u) =>
        u.map((user) =>
          user.id === id ? { ...user, is_active: !newState } : user
        )
      );
      toast.error("Falha ao atualizar status.");
      console.error(err);
    }
  };

  return (
    <section className="p-4">
      {/* Header and Search Bar (always visible) */}
      <header className="flex items-center justify-between mb-4 space-x-4">
        <h1 className="text-2xl font-bold">Usuários</h1>

        <input
          type="text"
          placeholder="Buscar por nome ou e-mail…"
          value={searchTerm}
          onChange={(e) => {
            setPage(1);
            setSearchTerm(e.target.value);
          }}
          className="w-64 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition">
          + Adicionar usuário
        </button>
      </header>

      {/* Table or Loading State */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Carregando usuários…</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="text-xs font-medium text-gray-500 uppercase bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">E-mail</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.is_staff ? "Administrador" : "Usuário"}
                  </td>
                  <td className="px-6 py-4">
                    <ToggleSwitch
                      defaultOn={user.is_active}
                      onChange={(active) => handleToggle(user.id, active)}
                    />
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    <button
                      aria-label="Editar"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      aria-label="Excluir"
                      className="text-gray-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => previous && setPage(page - 1)}
          disabled={!previous}
          className={`px-4 py-2 rounded-lg border ${
            previous ? "border-gray-300 hover:bg-gray-100" :
            "border-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Anterior
        </button>
        <span className="flex items-center px-2 text-gray-600">Página {page}</span>
        <button
          onClick={() => next && setPage(page + 1)}
          disabled={!next}
          className={`px-4 py-2 rounded-lg border ${
            next ? "border-gray-300 hover:bg-gray-100" :
            "border-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Próximo
        </button>
      </div>
    </section>
  );
}
