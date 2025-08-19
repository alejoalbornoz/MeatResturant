import Image from "next/image";

export default function MenuPage() {
  const menu = [
    {
      category: "Parrilla Principal",
      items: [
        {
          name: "Asado de Tira",
          price: "$13000",
          desc: "Clásico corte argentino a la parrilla",
          img: "/asado.jpg",
        },
        {
          name: "Vacio",
          price: "$12000",
          desc: "Corte jugoso, tierno y sabroso",
          img: "/vacio.jpg",
        },
        {
          name: "Chorizo y Morcilla",
          price: "$6000",
          desc: "Parrilleros tradicionales",
          img: "/chori.jpg",
        },
      ],
    },
    {
      category: "Guarniciones",
      items: [
        {
          name: "Papas Fritas",
          price: "$8000",
          desc: "Crocanes y doradas",
          img: "/papasfritas.jpg",
        },
        {
          name: "Ensalada Mixta",
          price: "$7000",
          desc: "Fresca y liviana",
          img: "/ensalada.jpg",
        },
        {
          name: "Provoleta",
          price: "$6000",
          desc: "Queso fundido a la parrilla",
          img: "/provoleta.jpg",
        },
      ],
    },
    {
      category: "Entradas & Empanadas",
      items: [
        {
          name: "Empanadas Criollas",
          price: "$1200 c/u",
          desc: "Carne cortada a cuchillo",
          img: "/empanadas.jpg",
        },
        {
          name: "Chorizo a la Pomarola",
          price: "$5000",
          desc: "Receta casera con salsa de tomate",
          img: "/chorizo.jpg",
        },
      ],
    },
    {
      category: "Bebidas & Postres",
      items: [
        {
          name: "Vino Malbec",
          price: "$35000",
          desc: "Botella de vino de la casa",
          img: "/vino.jpg",
        },
        {
          name: "Gaseosas",
          price: "$4000",
          desc: "Variedad de sabores",
          img: "/gaseosa.jpg",
        },
        {
          name: "Flan Casero",
          price: "$7500",
          desc: "Con dulce de leche y crema",
          img: "/flan.jpg",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#070608] min-h-screen text-white ">
      {/* Hero */}
      <div className="text-center py-16 bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-5xl font-bold text-white mb-4">Nuestro Menú</h1>
        <p className="text-lg text-gray-400">
          Sabores de la parrilla argentina preparados para vos
        </p>
      </div>

      {/* Menu Sections */}
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {menu.map((section, i) => (
          <div key={i}>
            <h2 className="text-3xl font-semibold text-red-500 mb-6">
              {section.category}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {section.items.map((item, j) => (
                <div
                  key={j}
                  className="bg-black/40 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
                >
                  <div className="h-48 relative">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                    <p className="text-red-500 font-semibold mt-2">
                      {item.price}
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
