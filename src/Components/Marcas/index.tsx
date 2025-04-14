import Image from "next/image";
import Link from "next/link";

// Marcas.tsx
type Marca = {
    name: string;
    logo: string;
    url: string;
  };
  
  export default function Marcas({ marcas }: { marcas: Marca[] }) {
    return (
      <div className="mt-4 flex flex-wrap gap-4">
        {marcas.map((marca, index) => (
          <Link href={marca.url} key={index}>
            <div className="w-40 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
              <Image
                src={marca.logo}
                alt={marca.name}
                width={100}
                height={60}
              />
              <p className="text-lg text-center">{marca.name}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  