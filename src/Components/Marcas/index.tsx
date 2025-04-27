"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { Trash2, Pencil, FileInput } from "lucide-react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";

import { deleteBrand, updateBrand } from "@/services/api";

import Image from "next/image";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_URL;

type Brand = {
  id: number;
  name: string;
  logo: string;
};

interface MarcasProps {
  marcas: Brand[];
  isEditMode: boolean;
  onDeleted?: (id: number) => void;
  onEdited?: () => void;
}


export default function Marcas({ marcas, isEditMode, onDeleted, onEdited }: MarcasProps) {
  const [deleting, setDeleting] = useState<Brand | null>(null);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setFile(null);
      setPreviewUrl(`${API_BASE_URL}${editing.logo}`);
    }
  }, [editing]);

  const confirmDelete = async () => {
    if (!deleting) return toast.error("Marca não encontrada");
    try {
      setLoading(true);
      await deleteBrand(deleting.id);
      setDeleting(null);
      onDeleted?.(deleting.id);
      toast.success("Marca deletada com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao apagar marca");
    } finally {
      setLoading(false);
    }
  };

  const confirmEdit = async () => {
    if (!name.trim()) {
      return toast.error("Preencha um nome válido");
    }

    // prepare form‑data
    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("logo", file);
    }

    try {
      setLoading(true);

      // ← pass both the id and the formData!
      await updateBrand(editing!.id, formData);

      // clear & close modal
      setEditing(null);
      setName("");
      setFile(null);
      setPreviewUrl("");

      // tell parent to refetch
      onEdited?.();

      toast.success("Marca atualizada com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar marca");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreviewUrl(URL.createObjectURL(f));
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {marcas.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            Nenhuma marca encontrada.
          </p>
        ) : (
          marcas.map((marca) => (
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
          ))
        )}
      </div>

      {/* Portals (modals) are OUTSIDE the brand list */}
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
                Você tem certeza que deseja deletar a marca <strong>{deleting.name}</strong>?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
                  onClick={() => setDeleting(null)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                  onClick={confirmDelete}
                  disabled={loading}
                >
                  {loading ? "Deletando..." : "Deletar"}
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
                Você está editando a marca <strong>{editing.name}</strong>:
              </p>
              <form onSubmit={(e) => { e.preventDefault(); confirmEdit(); }}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Nome da marca
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Nome da marca"
                  className="w-full border px-3 py-2 rounded mb-4"
                  required
                />
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Logo
                </label>
                {previewUrl && (
                  <div className="relative w-48 aspect-square justify-center mb-4">
                    <Image
                      src={previewUrl}
                      alt={`Preview de ${editing.name}`}
                      fill
                      sizes="100%"
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <label
                  htmlFor="logo-upload"
                  className="flex items-center gap-2 mb-4 cursor-pointer text-gray-700 hover:text-gray-900"
                >
                  <FileInput /> Alterar logo
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    onClick={() => setEditing(null)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 cursor-pointer"
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