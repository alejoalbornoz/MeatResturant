import Image from "next/image";

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
              <button className="w-50 px-6 py-3 border-2 border-white text-white font-bold rounded-md cursor-pointer hover:bg-amber-500 hover:border-amber-500 transition-all duration-300">
                Menú
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[100vh] bg-white">
        <div className="container mx-100 mt-10  flex ">
          <Image
            src="/foto1.jpg"
            alt="Asado Premium"
            width={450}
            height={500}
          />
          <div className="ml-10 w-150">
            <h2 className="text-4xl font-bold uppercase text-neutral-600 mb-5">
              La especialidad de la casa
            </h2>
            <p className="text-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
              placeat dolorem quo commodi cupiditate reprehenderit officia!
              Reiciendis, voluptate quam iusto sunt at quod delectus? Esse a
              facilis sint, quibusdam libero ea mollitia officiis! Possimus
              esse, eum id eos autem numquam non incidunt laudantium blanditiis
              distinctio aliquam doloremque adipisci dignissimos tempore
              quisquam ad inventore similique molestias soluta tenetur.
              Reprehenderit tenetur eius quisquam accusamus ea, quaerat placeat?
              Quasi, praesentium molestiae non veritatis expedita voluptatibus
              pariatur omnis beatae dolorum? Possimus temporibus magnam
              exercitationem dicta assumenda qui quis odit, omnis fugiat,
              consequatur cumque numquam repudiandae ea magni? Expedita,
              voluptatum? Eum architecto ex dolores explicabo!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
