import Image from "next/image";
import IconMeat from "@/components/IconMeat";
import { Caveat } from "next/font/google";

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
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="absolute inset-0 flex justify-center items-center z-20">
          <div className="flex flex-col items-center">
            <Image src="/logo.png" alt="Logo" width={650} height={400} />
            <div className="flex mt-6 gap-4">
              <button className="w-50 px-6 py-3 border-2 border-white text-white font-bold rounded-md cursor-pointer hover:bg-white hover:text-black transition-all duration-300">
                Reservar Ahora
              </button>
              <button className="w-50 px-6 py-3 border-2 border-white text-white font-bold rounded-md cursor-pointer hover:bg-orange-500 hover:border-orange-500 transition-all duration-300">
                Menú
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[150vh] ">
        <div className="container mx-75 mt-20 flex  ">
          <Image
            src="/foto3.png"
            alt="Asado Premium"
            width={650}
            height={400}
          />
          <div className="ml-10 w-150">
            {/* <IconMeat /> */}

            <h3
              className={`${caveat.className} text-orange-600 text-3xl mt-10`}
            >
              Asado a la parrilla
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
        <div className="flex flex-wrap justify-center gap-50 mt-30">
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center w-40">
            <div className="w-65 h-65 relative">
              <Image
                src="/asado.jpg" // Ruta de tu imagen en /public
                alt="Imagen 1"
                fill
                className="object-cover rounded-full shadow-lg"
              />
            </div>
            <p className="mt-6 text-2xl text-white">Asado</p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center w-40">
            <div className="w-65 h-65 relative">
              <Image
                src="/papasfritas.jpg"
                alt="Imagen 2"
                fill
                className="object-cover rounded-full shadow-lg"
              />
            </div>
            <p className="mt-6 text-2xl text-white">Papas fritas</p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center w-40">
            <div className="w-65 h-65 relative">
              <Image
                src="/ensalada.jpg"
                alt="Imagen 3"
                fill
                className="object-cover rounded-full shadow-lg"
              />
            </div>
            <p className="mt-6 text-2xl text-white">Ensaladas</p>
          </div>

          <div className="flex flex-col items-center text-center w-40  ">
            <div className="w-65 h-65 relative">
              <Image
                src="/empanadas.jpg"
                alt="Imagen 3"
                fill
                className="object-cover rounded-full shadow-lg"
              />
            </div>
            <p className="mt-6 text-2xl text-white">Empanadas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
