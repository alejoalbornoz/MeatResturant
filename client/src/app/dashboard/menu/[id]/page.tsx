"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
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
import { Label } from "@/components/ui/label";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (itemData.imageUrl) {
          setImagePreview(itemData.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecciona un archivo de imagen válido");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen no debe superar los 5MB");
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (item) {
      setItem({ ...item, imageUrl: "" });
    }
  };

  const handleUpdate = async () => {
    if (!item) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("description", item.description);
      formData.append("price", item.price.toString());
      formData.append("categoryId", item.categoryId.toString());
      formData.append("available", item.available.toString());

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`http://localhost:8080/api/menu/${item.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        const updatedItem = await res.json();
        console.log("Item actualizado:", updatedItem);
        router.push("/dashboard/menu");
      } else {
        const errorData = await res.json();
        console.error("Error al actualizar:", errorData);
        alert(
          "Error al actualizar el item: " +
            (errorData.error || "Error desconocido")
        );
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error de conexión al actualizar el item");
    } finally {
      setIsSubmitting(false);
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
            <div>
              <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                Nombre
              </Label>
              <Input
                id="name"
                placeholder="Nombre del item"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                className="bg-neutral-800 text-neutral-100"
              />
            </div>

            <div>
              <Label
                htmlFor="description"
                className="text-sm font-medium mb-2 block"
              >
                Descripción
              </Label>
              <Input
                id="description"
                placeholder="Descripción del item"
                value={item.description}
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
                className="bg-neutral-800 text-neutral-100"
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-sm font-medium mb-2 block">
                Precio
              </Label>
              <Input
                id="price"
                placeholder="Precio"
                type="number"
                step="0.01"
                min="0"
                value={item.price}
                onChange={(e) =>
                  setItem({ ...item, price: Number(e.target.value) })
                }
                className="bg-neutral-800 text-neutral-100"
              />
            </div>

            <div>
              <Label htmlFor="image" className="text-sm font-medium mb-2 block">
                Imagen
              </Label>

              {/* Preview de la imagen usando el componente Image de Next.js */}
              {imagePreview && (
                <div className="mb-3">
                  <div className="relative w-full h-32 rounded-md border border-neutral-700 overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeImage}
                    className="mt-2 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    Eliminar Imagen
                  </Button>
                </div>
              )}

              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-neutral-800 text-neutral-100 file:bg-neutral-700 file:text-neutral-100 file:border-0 file:mr-4 file:py-2 file:px-4 file:rounded cursor-pointer"
              />
              <p className="text-xs text-neutral-400 mt-1">
                Formatos aceptados: JPEG, PNG, WebP. Tamaño máximo: 5MB
              </p>
            </div>

            <div>
              <Label
                htmlFor="category"
                className="text-sm font-medium mb-2 block"
              >
                Categoría
              </Label>
              <Select
                value={item.categoryId.toString()}
                onValueChange={(val) =>
                  setItem({ ...item, categoryId: Number(val) })
                }
              >
                <SelectTrigger
                  id="category"
                  className="bg-neutral-800 text-neutral-100"
                >
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
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="available"
                checked={item.available}
                onChange={(e) =>
                  setItem({ ...item, available: e.target.checked })
                }
                className="w-4 h-4 rounded bg-neutral-800 border-neutral-700"
              />
              <Label htmlFor="available" className="text-sm font-medium">
                Disponible
              </Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleUpdate}
                disabled={isSubmitting}
                className="bg-neutral-100 text-black hover:bg-neutral-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
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
