"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { reajustPrice } from "@/services/api";
import { toast } from "react-hot-toast";

interface AddBrandButtonProps {
    brandId: number;
    onAdded?: () => void;
}

export default function ReajustButton({ onAdded, brandId }: AddBrandButtonProps) {
    const [open, setOpen] = useState(false);
    const [percent, setPercent] = useState("");
    const [loading, setLoading] = useState(false);

    const onSave = async () => {
        if (!percent) {
            return toast.error("Preencha todos os campos obrigatórios!");
        }

        const data = new FormData();
        data.append("brand", brandId.toString());
        data.append("percent", percent);


        try {
            setLoading(true);
            await reajustPrice(brandId, percent);

            setOpen(false);
            setPercent("");

            onAdded?.();
            toast.success("Valores reajustados com sucesso!");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao rajustar os valores.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-white text-black font-medium px-4 py-2 rounded-xl shadow hover:bg-cyan-200 transition border-dashed border-2 border-cyan-600 cursor-pointer"
            >
                Ajustar valores
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
                            <h2 className="text-xl font-semibold mb-4">Adicionar ajuste</h2>

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Porcentagem do ajuste
                            </label>
                            <input
                                type="number"
                                placeholder="Porcentagem do ajuste"
                                value={percent}
                                onChange={(e) => setPercent(e.target.value)}
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
