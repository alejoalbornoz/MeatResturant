import { prisma } from "../prismaClient.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createMenuItem(req, res) {
  try {
    const { name, description, price, categoryId, available } = req.body;
    
    // Validaciones básicas
    if (!name || !price) {
      if (req.file) {
        const fs = await import('fs');
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: "Nombre y precio son requeridos" });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/images/${req.file.filename}`;
    }

    // CORREGIR: Convertir available a boolean
    const availableBoolean = available === 'true' ? true : 
                            available === 'false' ? false : true;

    const newItem = await prisma.menuItem.create({
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        imageUrl,
        categoryId: categoryId ? parseInt(categoryId) : null,
        available: availableBoolean, // ← Ahora es boolean
      },
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.log("Se generó un error en el createMenuItems: ", error);
    
    if (req.file) {
      const fs = await import('fs');
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: "Error al crear el ítem del menú" });
  }
}

export async function getMenuItems(req, res) {
  try {
    const items = await prisma.menuItem.findMany({
      include: { category: true },
    });
    
    // Opcional: Convertir imageUrl a URL completa
    const itemsWithFullUrl = items.map(item => ({
      ...item,
      imageUrl: item.imageUrl ? `${req.protocol}://${req.get('host')}${item.imageUrl}` : null
    }));
    
    res.status(200).json(itemsWithFullUrl);
  } catch (error) {
    console.log("Se generó un error en el getMenuItems: ", error);
    res.status(500).json({ error: "Error al traer los items del menu" });
  }
}

export async function getUniqueMenuItems(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID es requerido" });
    }

    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(id) },
    });

    if (!menuItem) {
      return res.status(404).json({ error: "Item del menu no encontrado" });
    }

    // Opcional: Convertir imageUrl a URL completa
    const menuItemWithFullUrl = {
      ...menuItem,
      imageUrl: menuItem.imageUrl ? `${req.protocol}://${req.get('host')}${menuItem.imageUrl}` : null
    };

    return res.status(200).json(menuItemWithFullUrl);
  } catch (error) {
    console.log("Se generó un error al tratar de encontrar tu item del menu: ", error);
    res.status(500).json({ error: "Error al traer el item del menu" });
  }
}

export async function updateMenuItem(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId, available } = req.body;

    // Buscar el item actual
    const currentItem = await prisma.menuItem.findUnique({
      where: { id: Number(id) },
    });

    if (!currentItem) {
      if (req.file) {
        const fs = await import('fs');
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: "Item no encontrado" });
    }

    let imageUrl = currentItem.imageUrl;
    
    if (req.file) {
      const fs = await import('fs');
      
      if (currentItem.imageUrl) {
        const oldImagePath = path.join(__dirname, '..', currentItem.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      imageUrl = `/uploads/images/${req.file.filename}`;
    }

    // CORREGIR: Convertir available a boolean
    const availableBoolean = available === 'true' ? true : 
                            available === 'false' ? false : 
                            currentItem.available;

    const updateData = {
      name: name !== undefined ? name : currentItem.name,
      description: description !== undefined ? description : currentItem.description,
      price: price !== undefined ? parseFloat(price) : currentItem.price,
      categoryId: categoryId !== undefined ? parseInt(categoryId) : currentItem.categoryId,
      available: availableBoolean, // ← Ahora es boolean
    };

    if (req.file) {
      updateData.imageUrl = imageUrl;
    }

    const updateItem = await prisma.menuItem.update({
      where: { id: Number(id) },
      data: updateData,
    });

    res.json(updateItem);
  } catch (error) {
    console.log("Se generó un error en el updateMenuItem: ", error);
    
    if (req.file) {
      const fs = await import('fs');
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: "Error al actualizar un item del menu" });
  }
}

export async function deleteMenuItem(req, res) {
  try {
    const { id } = req.params;

    // Buscar el item para eliminar su imagen
    const item = await prisma.menuItem.findUnique({
      where: { id: Number(id) },
    });

    if (!item) {
      return res.status(404).json({ error: "Item no encontrado" });
    }

    // Eliminar la imagen del filesystem si existe
    if (item.imageUrl) {
      const fs = await import('fs');
      const imagePath = path.join(__dirname, '..', item.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.menuItem.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Ítem eliminado" });
  } catch (error) {
    console.log("Error al borrar ítem: ", error);
    res.status(500).json({ error: "Error al borrar ítem del menú" });
  }
}

// Las funciones de categoría permanecen igual...
export async function createCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ error: "El nombre es obligatorio" });

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(category);
  } catch (error) {
    console.log("Se generó un error en createCategory: ", error);
    res.status(500).json({ error: "Error al crear la categoria" });
  }
}

export async function getCategory(req, res) {
  try {
    const category = await prisma.category.findMany({
      include: { items: true },
    });

    res.status(200).json(category);
  } catch (error) {
    console.log("Se generó un error en getCategory", error);
    res.status(500).json({
      error: "Error al traer las categorias",
    });
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return res.status(400).json({ error: "ID de categoría inválido" });
    }

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre es requerido" });
    }

    const update = await prisma.category.update({
      where: { id: categoryId },
      data: { name: name.trim() },
    });

    res.status(200).json(update);
  } catch (error) {
    console.log("Se generó un error en updateCategory: ", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.status(500).json({ error: "Error al actualizar la categoria" });
  }
}