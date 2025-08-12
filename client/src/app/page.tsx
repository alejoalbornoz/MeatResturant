import Image from "next/image";

export default function Home() {
  return (
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

      {/* Texto encima */}
      <div className="absolute inset-0 flex justify-center items-center z-20">
        <h1 className="text-3xl text-white font-bold">Home</h1>
      </div>
    </div>
  );
}
