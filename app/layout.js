import localFont from "next/font/local";
import "./globals.css";
import Nav from "./ui/nav";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Chaotic Final",
  description: "A team randomizer that lets you add players and create random teams.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <Nav />
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
