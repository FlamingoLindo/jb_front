import Marcas from "@/Components/Marcas";
import { getBrands } from "@/services/api";
import AddBrandButton from "@/Components/AddBrandButton";


export default async function Home() {
  let brands = [];
  try {
    brands = await getBrands();
  } catch (e) {
    console.error("Error fetching brands:", e);
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Marcas</h1>

        <div className="flex gap-2">
          
          <AddBrandButton />
        </div>

      </div>

      <Marcas marcas={brands} />
    </div>
  );
}
