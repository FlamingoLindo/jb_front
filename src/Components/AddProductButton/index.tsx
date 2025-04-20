"use client";
import { useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { createProduct } from "@/services/api";
import { toast } from "react-hot-toast";

interface AddBrandButtonProps {
    brandId: number;
    onAdded?: () => void;
}

export default function AddProductButton({ onAdded, brandId }: AddBrandButtonProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const onSave = async () => {
        if (!name || !code || !description || !price || !file) {
            return toast.error("Preencha todos os campos obrigatórios!");
        }

        const data = new FormData();
        data.append("brand", brandId.toString());
        data.append("name", name);
        data.append("code", code);
        data.append("description", description);
        data.append("price", price);
        data.append("image", file);

        try {
            setLoading(true);
            await createProduct(data);

            // close & clear
            setOpen(false);
            setName("");
            setCode("");
            setDescription("");
            setPrice("");
            setFile(null);

            // let the parent refetch
            onAdded?.();
            toast.success("Produto adicionado com sucesso!");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao criar produto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer"
            >
                + Adicionar produto
            </button>

            {open &&
                createPortal(
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    >
                        <div
                            className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-semibold mb-4">Adicionar produto</h2>

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Nome do produto
                            </label>
                            <input
                                type="text"
                                placeholder="Nome do produto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border px-3 py-2 rounded mb-4"
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Código do produto
                            </label>
                            <input
                                type="text"
                                placeholder="Código do produto"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full border px-3 py-2 rounded mb-4"
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Descrição do produto
                            </label>
                            <input
                                type="text"
                                placeholder="Descrição do produto"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border px-3 py-2 rounded mb-4"
                            />
                            
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Preço do produto
                            </label>
                            <input
                                type="number"
                                placeholder="Preço do produto"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border px-3 py-2 rounded mb-4"
                            />

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Logo
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
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={onSave}
                                    disabled={loading}
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
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
