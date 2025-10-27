import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
