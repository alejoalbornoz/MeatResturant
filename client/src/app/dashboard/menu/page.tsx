"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
    imageUrl: "",
    categoryId: "",
  });

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

  const addItem = async () => {
    const res = await fetch("http://localhost:8080/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newItem,
        price: Number(newItem.price),
        categoryId: Number(newItem.categoryId),
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setItems((prev) => [...prev, created]);
      setNewItem({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        categoryId: "",
      });
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
              <CardTitle className="text-xl">Administrar Menú</CardTitle>
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
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Nombre"
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                        className="bg-neutral-800 text-neutral-100"
                      />
                      <Input
                        placeholder="Descripción"
                        value={newItem.description}
                        onChange={(e) =>
                          setNewItem({ ...newItem, description: e.target.value })
                        }
                        className="bg-neutral-800 text-neutral-100"
                      />
                      <Input
                        placeholder="Precio"
                        value={newItem.price}
                        onChange={(e) =>
                          setNewItem({ ...newItem, price: e.target.value })
                        }
                        className="bg-neutral-800 text-neutral-100"
                      />
                      <Input
                        placeholder="Imagen URL"
                        // type="file"
                        value={newItem.imageUrl}
                        onChange={(e) =>
                          setNewItem({ ...newItem, imageUrl: e.target.value })
                        }
                        className="bg-neutral-800 text-neutral-100"
                      />
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
                      <Button
                        onClick={addItem}
                        className="col-span-2  w-50 bg-neutral-100 text-black hover:bg-neutral-300 cursor-pointer"
                      >
                        Agregar
                      </Button>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Precio</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead className="text-right">Acción</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.id} className="hover:bg-neutral-800">
                            <TableCell>{item.name}</TableCell>
                            <TableCell>${item.price}</TableCell>
                            <TableCell>
                              {item.category?.name || "No category"}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                onClick={() => deleteItem(item.id)}
                                variant="destructive"
                                size="sm"
                                className="cursor-pointer"
                              >
                                Delete
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
