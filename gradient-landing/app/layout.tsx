import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gradient | Build. Create. Innovate.",
  description: "Next-generation AI and creative engine for modern startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-purple-500/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}
