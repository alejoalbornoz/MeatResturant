"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function CreateMenuItemPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    available: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/menu/category");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB');
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

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.categoryId) {
      alert("Por favor, completa todos los campos requeridos");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price.toString());
      data.append('categoryId', formData.categoryId.toString());
      data.append('available', formData.available.toString());
      
      if (imageFile) {
        data.append('image', imageFile);
      }

      const res = await fetch("http://localhost:8080/api/menu", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        router.push("/dashboard/menu");
      } else {
        const errorData = await res.json();
        alert("Error al crear el item: " + (errorData.error || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 text-neutral-100 bg-neutral-950 min-h-[100vh]">
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
            <CardTitle>Crear Nuevo Item del Menú</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Los mismos campos que en el componente de edición */}
            {/* ... (similar estructura al componente de edición) */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}