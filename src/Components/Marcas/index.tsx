import Image from "next/image";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_URL;

type Brand = {
  id: number;
  name: string;
  logo: string;
};

export default function Marcas({ marcas }: { marcas: Brand[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {marcas.map(marca => (
        <Link href={`brands/${marca.id}`} key={marca.id}>
          <div className="w-40 flex flex-col items-center hover:scale-105 transition">
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
          </div>
        </Link>
      ))}
    </div>
  );
}

