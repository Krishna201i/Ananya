import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Mukta, Caveat, Yatra_One } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
});

const yatraOne = Yatra_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-yatra",
});

export const metadata: Metadata = {
  title: "Happy Birthday, Annanya | A Love Story by Krishna",
  description: "A luxury animated love story and birthday letter dedicated to Annanya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${mukta.variable} ${caveat.variable} ${yatraOne.variable} dark`}
    >
      <body className="bg-[radial-gradient(130%_90%_at_50%_-12%,#c9536f_0%,#7a2452_42%,#2a0f2e_78%,#1c0a1e_100%)] text-[#faf1e2] font-sans antialiased overflow-x-hidden selection:bg-[#c9536f] selection:text-white cursor-none min-h-screen">
        {children}
      </body>
    </html>
  );
}
