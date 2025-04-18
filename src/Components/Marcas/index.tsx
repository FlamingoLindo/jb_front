import Image from "next/image";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_URL;

type Brand = {
  id: number;
  name: string;
  logo: string;
};

export default function Marcas({
  marcas,
  isEditMode,
}: {
  marcas: Brand[];
  isEditMode: boolean;
}) {
  return (
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
              <Trash2 className="cursor-pointer hover:text-red-600" />
              <Pencil className="cursor-pointer hover:text-blue-600" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
