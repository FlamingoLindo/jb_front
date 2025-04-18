'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';      // <-- for app-dir dynamic segments
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

import Products from '@/Components/Products';
import { getProductsByBrand, type Product } from '@/services/api';

export default function BrandPage() {
  const { id } = useParams<{ id: string }>();     // grabs the [id] from the URL
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    if (!id) return;                              // wait until id is defined
    try {
      const data = await getProductsByBrand(id);
      setProducts(data);
    } catch (err: unknown) {
      console.error(err);
      toast.error('Erro ao carregar produtos.');
    }
  }, [id]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/brands" className="p-1 rounded">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Voltar</span>
        </Link>

        <h1 className="text-3xl font-bold">
          Produtos da Marca {id}
        </h1>
      </div>

      <Products products={products} />
    </div>
  );
}
