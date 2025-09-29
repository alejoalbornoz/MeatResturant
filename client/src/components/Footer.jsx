import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#070608] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* Logo con sizes agregado */}
            <div className="relative w-12 h-12">
              <Image
                src="/logodon3.png"
                alt="Don Grillado"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 48px, 48px"
              />
            </div>
            <span className="text-xl font-bold tracking-wide">
              Don Grillado
            </span>
          </div>
          <p className="text-white/70 leading-relaxed">
            El sabor de la auténtica parrilla argentina.
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          <h3 className="text-white/80 font-semibold uppercase tracking-wider text-sm">
            Navegación
          </h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link href="/" className="hover:text-red-500 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="hover:text-red-500 transition-colors"
              >
                Menú
              </Link>
            </li>
            <li>
              <Link
                href="/reservas"
                className="hover:text-red-500 transition-colors"
              >
                Reservas
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="hover:text-red-500 transition-colors"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        {/* Socials */}
        <div className="space-y-3">
          <h3 className="text-white/80 font-semibold uppercase tracking-wider text-sm">
            Redes
          </h3>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              {/* <Instagram className="w-5 h-5" /> */}
            </Link>
            <Link
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              {/* <Facebook className="w-5 h-5" /> */}
            </Link>
            <Link
              href="#"
              aria-label="TikTok"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              {/* <Music2 className="w-5 h-5" /> */}
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-white/80 font-semibold uppercase tracking-wider text-sm">
            Información
          </h3>
          <div className="flex items-start gap-3 text-white/80">
            <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
            <p>
              Av. Siempreviva 123
              <br />
              Buenos Aires, Argentina
            </p>
          </div>
          <div className="flex items-start gap-3 text-white/80">
            <Clock className="w-5 h-5 mt-0.5 shrink-0" />
            <p>Lun - Dom: 11:30 – 23:00</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} Don Grillado. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="hover:text-white/90">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white/90">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
