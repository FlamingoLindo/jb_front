'use client';

import Marcas from "@/Components/Marcas";
import { getBrands } from "@/services/api";
import AddBrandButton from "@/Components/AddBrandButton";
import EnableEditButton from "@/Components/EnableEditButton";
import { useState } from "react";

import { useEffect } from "react";

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const fetchedBrands = await getBrands();
        setBrands(fetchedBrands);
      } catch (e) {
        console.error("Error fetching brands:", e);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Marcas</h1>

        <div className="flex gap-2">
          <EnableEditButton
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
          <AddBrandButton />
        </div>

      </div>

      <Marcas marcas={brands} isEditMode={isEditMode}/>
    </div>
  );
}
