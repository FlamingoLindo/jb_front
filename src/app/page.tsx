import Marcas from "@/Components/Marcas"; 

export default function Home() {
  const marcas = [
    {
      name: "Gerdau",
      logo: "/eu.jpg",
      url: "/marca1",
    },
    {
      name: "BOSCH",
      logo: "/eu.jpg",
      url: "/marca2",
    },
    {
      name: "Makita",
      logo: "/eu.jpg",
      url: "/marca3",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Marcas</h1>
      <Marcas marcas={marcas} />
    </div>
  );
}
