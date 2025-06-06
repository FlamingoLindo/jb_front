'use client'

import { useRouter } from 'next/navigation';
import Image from "next/image";
import { login } from '@/services/api';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await login(formData);

      const user = { ...response.user };
      delete user.password;

      localStorage.setItem('accessToken', response.access);
      localStorage.setItem('refreshToken', response.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));

      router.push('/dashboard/brands');
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Erro ao fazer login.");
    }
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
          className="flex flex-col gap-4 bg-white bg-opacity-80 p-8 rounded-xl shadow-2xl w-auto"
        >
          <div className="flex flex-col w-xs">
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
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
              >
                {showPassword
                  ? <EyeOff size={20} />
                  : <Eye size={20} />
                }
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="cursor-pointer"
            />
            <label htmlFor="rememberMe" className="cursor-pointer">
              Manter conectado
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#181e7e] text-white py-2 px-4 rounded-md hover:bg-blue-900 transition cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
