import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub Users Search",
  description: "Search and discover GitHub users",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-stone-950" lang="en">
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="https://twenty-icons.com/github.com/128"
      ></link>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
