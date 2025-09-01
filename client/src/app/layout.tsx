"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideComponent = pathname.startsWith("/dashboard"); // oculta también en subrutas

  return (
    <html lang="en" className="dark">
      <body className={rubik.className}>
        {!hideComponent && <Navbar />}
        {children}
        {!hideComponent && <Footer />}
      </body>
    </html>
  );
}
