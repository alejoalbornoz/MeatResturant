import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Pagina no encontrada </h1>
        <Link href="/" className="text-slate-300 hover:text-slate-200 ">
         Volver al inicio
        </Link>
      </div>
    </section>
  );
}
