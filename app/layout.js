import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata = {
  title: "Farsha Azizi — Back End & Full Stack Developer",
  description:
    "Portfolio of Farsha Azizi, a Senior Back End & Full Stack Developer with 7+ years of experience in Node.js, Laravel, and Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased`}>
      <body>{children}</body>
    </html>
  );
}
