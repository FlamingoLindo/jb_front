import { getBrand } from "@/services/api";
import Image from "next/image";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Product = {
  id: number;
  code: number;
  name: string;
  description: string;
  price: string;
  original_price: string;
  image: string;
};

export default async function BrandPage({
  params,
}: {
  params: { id: string };
}) {
  const { brand, products } = await getBrand(params.id);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="../brands"
          className="p-1 rounded"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Voltar</span>
        </Link>

        <h1 className="text-3xl font-bold">{brand.name}</h1>
      </div>
      <div className="flex flex-wrap gap-4">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="w-40 flex flex-col items-center hover:scale-105 transition"
          >
            <h2 className="text-center text-base font-semibold mb-1">
              {product.name}
            </h2>

            <div className="relative w-full aspect-square">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${product.image}`}
                alt={product.name}
                fill
                sizes="100%"
                className="object-cover rounded-lg"
                priority
              />
            </div>

            <div className="mt-2 text-center space-y-1">
              <p className="text-xs bg-yellow-300 inline-block px-1 rounded">
                {product.code}
              </p>
              <p className="text-xs text-red-500 truncate">
                {product.description}
              </p>
              <p className="font-medium bg-yellow-300 inline-block px-1 rounded">
                R$ {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
