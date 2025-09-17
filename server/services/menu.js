import { prisma } from "../prismaClient.js";

export async function createMenuItem(req, res) {
  try {
    const { name, description, price, imageUrl, categoryId, available } =
      req.body;

    const newItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        categoryId,
        available: available ?? true,
      },
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.log("Se genero un error en el createMenuItems: ", error);
    res.status(500).json({ error: "Error al crear el ítem del menú" });
  }
}

export async function getMenuItems(req, res) {
  try {
    const item = await prisma.menuItem.findMany({
      include: { category: true },
    });
    res.status(201).json(item);
  } catch (error) {
    console.log("Se genero un error en el getMenuItems: ", error);
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
      where: { id: parseInt(id) }, // Asumiendo que id es numérico
    });

    if (!menuItem) {
      return res.status(404).json({ error: "Item del menu no encontrado" });
    }

    return res.status(200).json(menuItem);
  } catch (error) {
    console.log(
      "Se genero un error al tratar de encontrar tu item del menu: ",
      error
    );
    res.status(500).json({ error: "Error al traer el item del menu" });
  }
}

export async function updateMenuItem(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, categoryId, available } =
      req.body;

    const updateItem = await prisma.menuItem.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price,
        imageUrl,
        categoryId,
        available,
      },
    });

    res.json(updateItem);
  } catch (error) {
    console.log("Se genero un error en el updateMenuItem: ", error);
    res.status(500).json({ error: "Error al actualizar un item del menu" });
  }
}

export async function deleteMenuItem(req, res) {
  try {
    const { id } = req.params;

    await prisma.menuItem.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Ítem eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al borrar ítem del menú" });
  }
}

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
    console.log("Se genero un error en createCategory: ", error);
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
    console.log("Se genero un error en getCategory", error);
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
    console.log("Se genero un error en updateCategory: ", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.status(500).json({ error: "Error al actualizar la categoria" });
  }
}
