import Image from "next/image";
import IconMeat from "@/components/FlameIcon";
import { Caveat } from "next/font/google";
import FlameIcon from "@/components/FlameIcon";

const caveat = Caveat({
  subsets: ["latin"],
  weight: "400",
});
export default function Home() {
  return (
    <div>
      <div className="relative w-full h-[80vh]">
        <Image
          src="/fotoPrincipal3.jpg"
          alt="Foto principal"
          fill
          className="object-cover object-bottom"
          priority
        />

        {/* Overlay negro con opacidad */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {/* Difuminado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent z-10"></div>

        <div className="absolute inset-0 flex justify-center items-center z-20">
          <div className="flex flex-col items-center">
            <Image src="/logodon3.png" alt="Logo" width={750} height={400} />
            <div className="flex gap-4">
              <button className="w-50 px-6 py-3 border-2 border-white text-white font-bold rounded-md cursor-pointer ">
                Reservar Ahora
              </button>
              <button className="w-50 px-6 py-3 border-2  text-white font-bold rounded-md cursor-pointer bg-orange-500 border-orange-500 ">
                Menú
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[170vh] ">
        <div className="container mx-75 mt-20 flex  ">
          <Image
            src="/bifechorizo.jpg"
            alt="Asado Premium"
            width={800}
            height={400}
            className="rounded-4xl"
          />
          <div className="ml-10 w-150 ">
            <h3
              className={`${caveat.className} text-orange-600 text-3xl mt-10`}
            >
              Bife de Chorizo
            </h3>

            <h2 className="text-4xl font-bold uppercase text-white mb-5">
              La especialidad de la casa
            </h2>
            <p className="text-xl text-neutral-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
              placeat dolorem quo commodi cupiditate reprehenderit officia!
              Reiciendis, voluptate quam iusto sunt at quod delectus? Esse a
              facilis sint, quibusdam libero ea mollitia officiis! Possimus
              esse, eum id eos autem numquam non incidunt laudantium blanditiis
              distinctio aliquam doloremque adipisci dignissimos tempore
              quisquam ad inventore similique molestias soluta tenetur.
            </p>
            <div className="bg-orange-700 w-125 h-25 mt-10 flex items-center justify-center rounded-md">
              <h2 className="text-white text-3xl font-bold italic">
                $25.000 Para dos personas
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-30 ">
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center w-100 h-100 bg-neutral-950 rounded-4xl ">
            <div className="w-100 h-70 relative">
              <Image
                src="/asado.jpg"
                alt="Imagen 1"
                fill
                className="object-cover  shadow-lg"
              />
            </div>
            <p className="mt-6 text-2xl text-white">Asado</p>
            <p className="text-white mt-2">Lorem ipsum dolor sit amet</p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center w-100 h-100 bg-neutral-950 rounded-4xl">
            <div className="w-100 h-70 relative">
              <Image
                src="/papasfritas.jpg"
                alt="Imagen 2"
                fill
                className="object-cover  shadow-lg"
              />
            </div>
            <p className="mt-6 text-2xl text-white">Papas fritas</p>
            <p className="text-white mt-2">Lorem ipsum dolor</p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center w-100 h-100 bg-neutral-950 rounded-4xl">
            <div className="w-100 h-70 relative">
              <Image
                src="/ensalada.jpg"
                alt="Imagen 3"
                fill
                className="object-cover  shadow-lg"
              />
            </div>
            <p className="mt-6 text-2xl text-white">Ensaladas</p>
            <p className="text-white mt-2">Lorem ipsum dolor sit</p>
          </div>

          <div className="flex flex-col items-center text-center w-100 h-100 bg-neutral-950 rounded-4xl ">
            <div className="w-100 h-70 relative">
              <Image
                src="/empanadas.jpg"
                alt="Imagen 3"
                fill
                className="object-cover  shadow-lg"
              />
            </div>
            <p className="mt-6 text-2xl text-white">Empanadas</p>
            <p className="text-white mt-2">
              Disfruta de unas ricas empanadas fritas
            </p>
          </div>
        </div>

        <div className="relative flex justify-center mt-30">
          <Image
            src="/parillacomida.jpg"
            alt="Preparados para venir?"
            className="object-cover rounded-4xl"
            width={1000}
            height={800}
            priority
          />

          {/* Capa negra con opacidad */}
          <div className="absolute inset-0 bg-black/40 rounded-4xl"></div>

          {/* Texto encima de la imagen */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-white text-4xl font-bold text-center">
              ¿Estás preparado para visitarnos?
            </h1>

            <div>
              <button className="flex flex-row bg-red-800 text-white  font-bold text-2xl p-5 mt-10 rounded-4xl cursor-pointer">
                <FlameIcon />
                <h3 className="ml-1">Reserva ahora!</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
