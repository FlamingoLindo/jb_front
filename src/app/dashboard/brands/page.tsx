import Marcas from "@/Components/Marcas";
import { getBrands } from "@/services/api";

type Brand = {
  id: number;
  name: string;
  logo: string;
};

export default async function Home() {
  let brands: Brand[] = [];

  try {
    brands = await getBrands();
  } catch (error) {
    console.error("Error fetching brands:", error);
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Marcas</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Adicionar marca
        </button>
      </div>
        
      <Marcas marcas={brands} />
    </div>
  );
}
