'use client';

import { getBrands, type Brand } from "@/services/api";
import { useState, useEffect, useCallback } from "react";

import AddBrandButton from "@/Components/AddBrandButton";
import EnableEditButton from "@/Components/EnableEditButton";
import Marcas from "@/Components/Marcas";

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);

  // stable fetch function
  const fetchBrands = useCallback(async () => {
    try {
      const fetched = await getBrands();
      setBrands(fetched);
    } catch (e) {
      console.error("Error fetching brands:", e);
    }
  }, []);

  // initial load
  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Marcas</h1>
        <div className="flex gap-2">
          <EnableEditButton
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
          {/* pass fetchBrands as a callback */}
          <AddBrandButton onAdded={fetchBrands} />
        </div>
      </div>
      <Marcas
        marcas={brands}
        isEditMode={isEditMode}
        onDeleted={(id) => setBrands((prev) => prev.filter((b) => b.id !== id))}
        onEdited={fetchBrands}
      />
    </div>
  );
}
