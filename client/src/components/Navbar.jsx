import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-30">
      <div className="container mx-auto flex justify-between items-center py-4">
        <h3 className="font-bold text-3xl italic text-white">
          <Link href="/">Don Grillado</Link>
        </h3>
        <ul className="flex gap-x-4 text-lg font-bold text-white">
          <li>
            <Link href="/reservation">Reservas</Link>
          </li>
          <li>
            <Link href="/menu">Menu</Link>
          </li>
          <li>
            <Link href="/contact">Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
