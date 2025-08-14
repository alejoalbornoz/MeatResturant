import Image from "next/image";
import IconMeat from "@/components/IconMeat";

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
            <Image
              src="/logo.png"
              alt="Logo"
              width={550}
              height={400}
              
            />
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
      <div className="relative h-[100vh] ">
        <div className="container mx-50 mt-10  flex ">
          <Image
            src="/foto2.jpg"
            alt="Asado Premium"
            width={750}
            height={500}
            className="rounded-md"
          />
          <div className="ml-10 w-150">
            {/* <IconMeat /> */}
            <h3 className="text-orange-600 text-2xl mt-10">
                Asado a la parilla
            </h3>
            <h2 className="text-4xl font-bold uppercase text-white mb-5">
              La especialidad de la casa
            </h2>
            <p className="text-xl text-neutral-300 mt-10">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
              placeat dolorem quo commodi cupiditate reprehenderit officia!
              Reiciendis, voluptate quam iusto sunt at quod delectus? Esse a
              facilis sint, quibusdam libero ea mollitia officiis! Possimus
              esse, eum id eos autem numquam non incidunt laudantium blanditiis
              distinctio aliquam doloremque adipisci dignissimos tempore
              quisquam ad inventore similique molestias soluta tenetur.
            </p>
            <div className="bg-orange-700 w-125 h-25 mt-10 flex items-center justify-center rounded-md">
              <h2 className="text-white text-3xl">
                $25.000 Para dos personas
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
