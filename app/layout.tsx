import React from 'react'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/animations.css";
import Header from "./components/layout/Header";
import { ListProvider } from './services/ListService';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gestion de Contacts",
  description: "Application web simple et intuitive pour gérer vos contacts",
  keywords: ["contacts", "gestion", "répertoire", "next.js", "react"],
  authors: [{ name: "NG TECH Developpers" }],
  creator: "HouleyD-oumar",
  applicationName: "Gestion de Contacts",
  generator: "Next.js",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ListProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </ListProvider>
      </body>
    </html>
  );
}
