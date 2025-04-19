import Image from "next/image";

type Product = {
  id: number;
  code: number;
  name: string;
  description: string;
  price: string;
  original_price: string;
  image: string;
};

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
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
            {product.original_price !== product.price && (
              <p className="text-sm line-through font-light">
                R$ {product.original_price}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
