import { deleteProduct, updateProduct } from "@/services/api";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

type Product = {
  id: number;
  code: number;
  name: string;
  description: string;
  price: string;
  original_price: string;
  image: string;
};

interface ProductsProps {
  brandId: number;
  products: Product[];
  isEditMode: boolean;
  onDeleted?: (id: number) => void;
  onEdited?: () => void;
}

export default function Products({
  products,
  isEditMode,
  onDeleted,
  onEdited,
  brandId,
}: ProductsProps) {
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Initialize edit form fields with selected product
  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setCode(editing.code.toString());
      setDescription(editing.description);
      setPrice(editing.price);
      setFile(null);
    }
  }, [editing]);

  const confirmDelete = async () => {
    if (!deleting) return toast.error("Produto não encontrado");
    try {
      setLoading(true);
      await deleteProduct(deleting.id);
      setDeleting(null);
      onDeleted?.(deleting.id);
      toast.success("Produto deletado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao apagar produto");
    } finally {
      setLoading(false);
    }
  };

  const confirmEdit = async () => {
    if (!name || !code || !description || !price) {
      return toast.error("Preencha todos os campos obrigatórios");
    }

    const formData = new FormData();
    formData.append("brand", brandId.toString());
    formData.append("name", name);
    formData.append("code", code);
    formData.append("description", description);
    formData.append("price", price);

    if (file) {
      formData.append("image", file);
    }

    try {
      setLoading(true);
      await updateProduct(editing!.id, formData);

      setEditing(null);
      onEdited?.();
      toast.success("Produto atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-40 flex flex-col items-center hover:scale-105 transition"
        >
          <h2 className="text-center text-base font-semibold mb-1">
            {product.name}
          </h2>

          <div className="relative w-full aspect-square">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${product.image}`}
              alt={product.name}
              fill
              sizes="100%"
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="mt-2 text-center space-y-1">
            <p className="text-xs bg-yellow-300 inline-block px-1 rounded">
              {product.code}
            </p>
            <p className="text-xs text-red-500 truncate">
              {product.description}
            </p>
            <p className="font-medium bg-yellow-300 inline-block px-1 rounded">
              R$ {product.price}
            </p>
            {product.original_price !== product.price && (
              <p className="text-sm line-through font-light">
                R$ {product.original_price}
              </p>
            )}
          </div>
          {isEditMode && (
            <div className="flex gap-2 mt-2">
              <Trash2
                className="cursor-pointer hover:text-red-600"
                onClick={() => setDeleting(product)}
              />
              <Pencil
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setEditing(product)}
              />
            </div>
          )}
        </div>
      ))}

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
              <h2 className="text-lg font-bold mb-4">Deletar produto</h2>
              <p className="mb-4">
                Deseja deletar o produto <strong>{deleting.name}</strong>?
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
              <h2 className="text-lg font-bold mb-4">Editar produto</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  confirmEdit();
                }}
              >
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Nome do produto
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full border px-3 py-2 rounded mb-4"
                  required
                />

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Código
                </label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  className="w-full border px-3 py-2 rounded mb-4"
                  required
                />

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="w-full border px-3 py-2 rounded mb-4"
                  required
                />

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Preço
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="w-full border px-3 py-2 rounded mb-4"
                  required
                />

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Imagem (opcional)
                </label>
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
    </div>
  );
}
