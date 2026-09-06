import type { Metadata } from "next";
import { Stardos_Stencil, Special_Elite } from "next/font/google";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import "./globals.css";

const stencil = Stardos_Stencil({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const typewriter = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Marck Beggs — poet, songwriter, professor",
  description:
    "Poetry collections from Salmon Poetry, songs from the band dog gods, and the academic work of Marck L. Beggs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${stencil.variable} ${typewriter.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
