"use client";

import { Pencil } from "lucide-react";

interface EnableEditButtonProps {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}


export default function EnableEditButton( {isEditMode, setIsEditMode} : EnableEditButtonProps) {

  return (
    <>
      <button 
        className="bg-lime-600 text-white font-medium px-4 py-2 rounded-xl shadow hover:bg-lime-700 transition"
        onClick={() => {
          setIsEditMode(!isEditMode);
          console.log("Edit mode:", !isEditMode);
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <Pencil />
          <span>{isEditMode ? "Desabilitar edição" : "Habilitar edição"}</span>
        </div>
      </button>
    </>
  );
}
