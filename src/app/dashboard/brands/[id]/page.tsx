'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

import Products from '@/Components/Products';
import { getProductsByBrand, getBrandById } from '@/services/api';
import type { Brand, Product } from "@/interfaces";

import AddProductButton from '@/Components/AddProductButton';
import EnableEditButton from '@/Components/EnableEditButton';
import ReajustButton from '@/Components/ReajustButton';
import RestoreButton from '@/Components/RestoreButton';

export default function BrandPage() {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchProductsAndBrand = useCallback(async () => {
    if (!id) return;
    try {
      const [productsData, brandData] = await Promise.all([
        getProductsByBrand(id),
        getBrandById(id),
      ]);

      setProducts(productsData);
      setBrand(brandData);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao carregar informações da marca.');
    }
  }, [id]);

  useEffect(() => {
    fetchProductsAndBrand();
  }, [fetchProductsAndBrand]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard/brands" className="p-1 rounded">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Voltar</span>
        </Link>

        <h1 className="text-3xl font-bold">
          {brand ? `${brand.name}` : 'Carregando...'}
        </h1>

        <div className="ml-auto flex gap-2">
          <ReajustButton
            brandId={Number(id)}
            onAdded={fetchProductsAndBrand}
          />
          <RestoreButton
            brandId={Number(id)}
            onAdded={fetchProductsAndBrand}
          />
          <EnableEditButton
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
          <AddProductButton
            brandId={Number(id)}
            onAdded={fetchProductsAndBrand}
          />
        </div>
      </div>

      <Products
        brandId={Number(id)}
        products={products}
        isEditMode={isEditMode}
        onDeleted={(deletedId) =>
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== deletedId)
          )
        }
        onEdited={fetchProductsAndBrand}
      />
    </div>
  );
}
