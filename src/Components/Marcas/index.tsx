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
        {marcas.map((marca, index) => (
          <Link href={`/brands/${marca.id}`} key={index}>
            <div 
            key={marca.id}
            className="w-40 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
              <Image
                src={`${API_BASE_URL}${marca.logo}`}
                alt={marca.name}
                width={100}
                height={60}
                className="object-fill w-full h-32 rounded-lg"
              />
              <p className="text-lg text-center">{marca.name}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  