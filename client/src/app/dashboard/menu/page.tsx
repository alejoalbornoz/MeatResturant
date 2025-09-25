"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

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
  category?: Category;
}

export default function MenuDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/menu/category").then((res) =>
        res.json()
      ),
      fetch("http://localhost:8080/api/menu").then((res) => res.json()),
    ]).then(([cats, menuItems]) => {
      setCategories(cats);
      setItems(menuItems);
    });
  }, []);

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    const res = await fetch("http://localhost:8080/api/menu/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    });
    if (res.ok) {
      const created = await res.json();
      setCategories((prev) => [...prev, created]);
      setNewCategory("");
    }
  };

  const deleteCategory = async (id: number) => {
    const res = await fetch(`http://localhost:8080/api/menu/category/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

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
  };

  const addItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.categoryId) {
      alert("Por favor, completa todos los campos requeridos");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("description", newItem.description);
      formData.append("price", newItem.price);
      formData.append("categoryId", newItem.categoryId);
      formData.append("available", "true");

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("http://localhost:8080/api/menu", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const created = await res.json();
        setItems((prev) => [...prev, created]);
        setNewItem({
          name: "",
          description: "",
          price: "",
          categoryId: "",
        });
        setImageFile(null);
        setImagePreview("");
      } else {
        const errorData = await res.json();
        alert(
          "Error al crear el item: " + (errorData.error || "Error desconocido")
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteItem = async (id: number) => {
    const res = await fetch(`http://localhost:8080/api/menu/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-6 text-neutral-100 bg-neutral-950 min-h-screen">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-xl">
                Administrar Menú y Categorías
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="items" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="items">Crear Items</TabsTrigger>
                  <TabsTrigger value="categories">Crear Categorías</TabsTrigger>
                </TabsList>

                {/* TAB ITEMS */}
                <TabsContent value="items">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium mb-2 block"
                        >
                          Nombre
                        </Label>
                        <Input
                          id="name"
                          placeholder="Nombre del item"
                          value={newItem.name}
                          onChange={(e) =>
                            setNewItem({ ...newItem, name: e.target.value })
                          }
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
                          placeholder="Descripción"
                          value={newItem.description}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              description: e.target.value,
                            })
                          }
                          className="bg-neutral-800 text-neutral-100"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="price"
                          className="text-sm font-medium mb-2 block"
                        >
                          Precio
                        </Label>
                        <Input
                          id="price"
                          placeholder="Precio"
                          type="number"
                          step="0.01"
                          value={newItem.price}
                          onChange={(e) =>
                            setNewItem({ ...newItem, price: e.target.value })
                          }
                          className="bg-neutral-800 text-neutral-100"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="category"
                          className="text-sm font-medium mb-2 block"
                        >
                          Categoría
                        </Label>
                        <Select
                          onValueChange={(val) =>
                            setNewItem({ ...newItem, categoryId: val })
                          }
                        >
                          <SelectTrigger className="bg-neutral-800 text-neutral-100">
                            <SelectValue placeholder="Seleccionar categoria" />
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

                      <div className="md:col-span-2">
                        <Label
                          htmlFor="image"
                          className="text-sm font-medium mb-2 block"
                        >
                          Imagen
                        </Label>

                        {/* Preview de la imagen */}
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
                          Formatos aceptados: JPEG, PNG, WebP. Tamaño máximo:
                          5MB
                        </p>
                      </div>

                      <Button
                        onClick={addItem}
                        disabled={isSubmitting}
                        className="md:col-span-2 w-50 bg-neutral-100 text-black hover:bg-neutral-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Creando..." : "Agregar Item"}
                      </Button>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Precio</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead className="text-right -translate-x-15">
                            Acción
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow
                            key={item.id}
                            className="hover:bg-neutral-800"
                          >
                            <TableCell>{item.name}</TableCell>
                            <TableCell>${item.price}</TableCell>
                            <TableCell>
                              {item.category?.name || "No category"}
                            </TableCell>
                            <TableCell className="text-right gap-5 flex justify-end">
                              <Link href={`/dashboard/menu/${item.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="cursor-pointer"
                                >
                                  Editar
                                </Button>
                              </Link>
                              <Button
                                onClick={() => deleteItem(item.id)}
                                variant="destructive"
                                size="sm"
                                className="cursor-pointer"
                              >
                                Eliminar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* TAB CATEGORIES */}
                <TabsContent value="categories">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nuevo nombre de categoría"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="bg-neutral-800 w-100 text-neutral-100"
                      />
                      <Button
                        onClick={addCategory}
                        className="bg-neutral-100 text-black hover:bg-neutral-300 cursor-pointer"
                      >
                        Agregar
                      </Button>
                    </div>
                    <ul className="space-y-2">
                      {categories.map((cat) => (
                        <li
                          key={cat.id}
                          className="flex justify-between items-center bg-neutral-800 rounded px-4 py-2"
                        >
                          <span>{cat.name}</span>
                          <Button
                            onClick={() => deleteCategory(cat.id)}
                            variant="destructive"
                            size="sm"
                            className="cursor-pointer"
                          >
                            Delete
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
