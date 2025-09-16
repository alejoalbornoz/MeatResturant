import { prisma } from "../prismaClient.js";


export default async function createMenuItem(req, res) {
  try {
    const { name, description, price, imageUrl, categoryId, available } =
      req.body;

    const newItem = await prisma.create({
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
    console.log("Se genero un error en el createMenuItems: ",error);
    res.status(500).json({ error: "Error al crear el ítem del menú" });
  }
}

export default async function getMenuItems(req, res){
    try{
        const item = await prisma.menuItem.findMany({
            include: { category: true },
        })
        res.status(201).json(item)
    }catch(error){
        console.log("Se genero un error en el getMenuItems: ",error)
        res.status(500).json({error: "Error al traer los items del menu"})
    }

}

export default async function updateMenuItem(req, res){
  try{
    const { id } = req.params
    const {name, description, price, imageUrl, categoryId, available} = req.body


    const updateItem = await prisma.menuItem.update({
      where: {id: Number(id) },
      data:{
        name,
        description,
        price,
        imageUrl,
        categoryId,
        available,
      },
    })

    res.json(updateItem)

  }catch(error){
    console.log("Se genero un error en el updateMenuItem: ", error)
    res.status(500).json({error: "Error al actualizar un item del menu"})
    
  }
}


export default async function deleteMenuItem (req, res){
  try {
    const { id } = req.params;
   
    await prisma.menuItem.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Ítem eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al borrar ítem del menú" });
  }
};