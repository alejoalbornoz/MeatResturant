import Navbar from "@/components/Navbar";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400"], 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oswald.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
