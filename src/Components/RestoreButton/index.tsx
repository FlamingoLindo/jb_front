"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { restorePrice } from "@/services/api";
import { toast } from "react-hot-toast";

interface AddBrandButtonProps {
    brandId: number;
    onAdded?: () => void;
}

export default function RestoreButton({ onAdded, brandId }: AddBrandButtonProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSave = async () => {

        try {
            setLoading(true);
            await restorePrice(brandId);

            setOpen(false);

            onAdded?.();
            toast.success("Valores restaurados com sucesso!");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao restaurar valores.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-white text-black font-medium px-4 py-2 rounded-xl shadow hover:bg-red-200 transition border-dashed border-2 border-red-600"
            >
                Restaurar valores
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
                            <h2 className="text-lg font-bold mb-4">Restaurar valores</h2>
                            <p className="mb-4">
                                Todos os preços dos produtos dessa marca
                                serão restaurados para o valor original.<br></br>
                                <strong>Você tem certeza que deseja continuar?</strong>
                            </p>

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
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                                >
                                    {loading ? "Salvando..." : "Restaurar"}
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
