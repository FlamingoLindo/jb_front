"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { createBrand } from "@/services/api";
import { useRouter } from "next/navigation";

export default function AddBrandButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /* close on Esc */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* handle submit */
  const onSave = async () => {
    if (!name.trim() || !file) return alert("Preencha nome e logo");

    const data = new FormData();
    data.append("name", name);
    data.append("logo", file);

    try {
      setLoading(true);
      await createBrand(data);
      setOpen(false);
      setName("");
      setFile(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Erro ao criar marca");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
      >
        + Adicionar marca
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Adicionar marca</h2>

              {/* nome */}
              <input
                type="text"
                placeholder="Nome da marca"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4"
              />

              {/* logo */}
              <input
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFile(e.target.files?.[0] || null)
                }
                className="w-full border px-3 py-2 rounded mb-4"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={onSave}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
