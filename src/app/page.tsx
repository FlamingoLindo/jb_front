'use client'

import { useRouter } from 'next/navigation'; // Alteração aqui
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de validação de login aqui
    router.push('/dashboard/brands'); // Redireciona para a página /dashboard
  };

  return (
    <main className="min-h-screen bg-[url('/back_ground.png')] bg-cover bg-center">
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <Image
          src={"/full_logo.png"}
          alt="logo"
          width={600}
          height={500}
          className="mb-10"
        />
        <div className="text-2xl font-bold mb-5 text-[#181e7e]">
          Área do administrador
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white bg-opacity-80 p-8 rounded-xl shadow-md"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold text-sm">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-semibold text-sm">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe">Manter Conectado</label>
          </div>
          <button
            type="submit"
            className="bg-[#181e7e] text-white py-2 px-4 rounded-md hover:bg-blue-900 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
