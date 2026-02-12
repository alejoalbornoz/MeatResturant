"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: {
    id: number;
    name: string;
  } | null;
};

export default function MenuPage() {
  const [itemsMenu, setItemsMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/menu/", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Error al cargar los items del menu");
        const data = await res.json();
        setItemsMenu(data);
      } catch (error) {
        console.log(
          "Se genero un error al tratar de traer los items del menu",
          error
        );
      }
    };

    fetchMenu();
  }, []);

  const groupedMenu = itemsMenu.reduce<Record<string, MenuItem[]>>(
    (acc, item) => {
      const catName = item.category?.name || "Sin categoría";
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="bg-[#070608] min-h-screen text-white">
      {/* Hero */}
      <div className="text-center py-16 bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-5xl font-bold text-white mb-4">Nuestro Menú</h1>
        <p className="text-lg text-gray-400">
          Sabores de la parrilla argentina preparados para vos
        </p>
      </div>

      {/* Secciones del menú */}
      <div className="max-w-6xl  mx-auto px-6 space-y-16">
        {Object.entries(groupedMenu).map(([categoryName, items]) => (
          <div key={categoryName}>
            <h2 className="text-3xl font-semibold text-red-500 mb-6">
              {categoryName}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-black/40 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
                >
                  <div className="h-48 relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                      priority={index < 6} // Prioriza las primeras 6 imágenes
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                    <p className="text-red-500 font-semibold mt-2">
                      ${item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}
