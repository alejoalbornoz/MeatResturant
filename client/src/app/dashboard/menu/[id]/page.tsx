"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: number;
  name: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
  categoryId: number;
}

export default function EditMenuItemPage() {
  const params = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, itemRes] = await Promise.all([
          fetch("http://localhost:8080/api/menu/category"),
          fetch(`http://localhost:8080/api/menu/${params.id}`),
        ]);

        const categoriesData = await categoriesRes.json();
        const itemData = await itemRes.json();

        setCategories(categoriesData);
        setItem(itemData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleUpdate = async () => {
    if (!item) return;

    const res = await fetch(`http://localhost:8080/api/menu/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      router.push("/dashboard/menu"); // Ajusta la ruta según tu estructura
    }
  };

  if (loading) return <div className="p-6 text-neutral-100">Cargando...</div>;
  if (!item)
    return <div className="p-6 text-neutral-100">Item no encontrado</div>;

  return (
    <div className="p-6 text-neutral-100 bg-neutral-950 min-h-[100vh] ">
      <div className="max-w-2xl mx-auto flex flex-col justify-center min-h-[80vh]">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-4 w-40 cursor-pointer"
        >
          ← Volver
        </Button>
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle>Editar Item del Menú</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Nombre"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              className="bg-neutral-800 text-neutral-100"
            />
            <Input
              placeholder="Descripción"
              value={item.description}
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
              className="bg-neutral-800 text-neutral-100"
            />
            <Input
              placeholder="Precio"
              type="number"
              value={item.price}
              onChange={(e) =>
                setItem({ ...item, price: Number(e.target.value) })
              }
              className="bg-neutral-800 text-neutral-100"
            />
            <Input
              placeholder="Imagen URL"
              value={item.imageUrl}
              onChange={(e) => setItem({ ...item, imageUrl: e.target.value })}
              className="bg-neutral-800 text-neutral-100"
            />
            <Select
              value={item.categoryId.toString()}
              onValueChange={(val) =>
                setItem({ ...item, categoryId: Number(val) })
              }
            >
              <SelectTrigger className="bg-neutral-800 text-neutral-100">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleUpdate}
                className="bg-neutral-100 text-black hover:bg-neutral-300 cursor-pointer"
              >
                Guardar Cambios
              </Button>
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="cursor-pointer"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
