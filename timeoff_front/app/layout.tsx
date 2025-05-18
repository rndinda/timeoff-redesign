import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: "Timeoff",
  description: "Timeoff but better and more flexible than the first version.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
