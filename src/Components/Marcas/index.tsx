"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";
import { createPortal } from "react-dom";

const API_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_URL;

type Brand = {
  id: number;
  name: string;
  logo: string;
};

interface MarcasProps {
  marcas: Brand[];
  isEditMode: boolean;
}

export default function Marcas({ marcas, isEditMode }: MarcasProps) {
  const [deleting, setDeleting] = useState<Brand | null>(null);
  const [editing, setEditing] = useState<Brand | null>(null);

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      console.log("deleted", deleting.id);
    } finally {
      setDeleting(null);
    }
  };

  const confirmEdit = async () => {
    if (!editing) return;
    try {
      console.log("edited", editing.id);
    } finally {
      setEditing(null);
    }
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-4">
        {marcas.map((marca) => (
          <div
            key={marca.id}
            className="w-40 flex flex-col items-center hover:scale-105 transition"
          >
            <Link href={`brands/${marca.id}`} className="w-full">
              <div className="relative w-full aspect-square">
                <Image
                  src={`${API_BASE_URL}${marca.logo}`}
                  alt={marca.name}
                  fill
                  sizes="100%"
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="mt-2 text-lg text-center">{marca.name}</p>
            </Link>

            {isEditMode && (
              <div className="flex gap-2 mt-2">
                <Trash2
                  className="cursor-pointer hover:text-red-600"
                  onClick={() => setDeleting(marca)}
                />
                <Pencil
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => setEditing(marca)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {deleting &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleting(null)}
          >
            <div
              className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold mb-4">Deletar marca</h2>
              <p className="mb-4">
                Você tem certeza que deseja deletar a marca{" "}
                <strong>{deleting.name}</strong>?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  onClick={() => setDeleting(null)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {editing &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setEditing(null)}
          >
            <div
              className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold mb-4">Editar marca</h2>
              <p className="mb-4">
                Você está editando a marca{" "}
                <strong>{editing.name}</strong>:
              </p>

              <form 
                onSubmit={(e) => {e.preventDefault(); confirmEdit()}}>
                <input
                  type="text"
                  placeholder="Nome da marca"
                  className="w-full border px-3 py-2 rounded mb-4"
                  required
                />

                <input
                  type="file"
                  accept="image/*"
                  className="w-full border px-3 py-2 rounded mb-4"
                  required
                />

                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                    onClick={() => setEditing(null)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                    onSubmit={confirmEdit}
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
