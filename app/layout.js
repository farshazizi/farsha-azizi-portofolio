import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: [
    "Farsha Azizi",
    "Back End Developer",
    "Full Stack Developer",
    "Laravel",
    "Node.js",
    "Express.js",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export const viewport = { themeColor: "#D42121" };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "Back End & Full Stack Developer",
  url: SITE_URL,
  email: "mailto:farshazizi22@gmail.com",
  sameAs: ["https://www.linkedin.com/in/farsha-azizi/", "https://github.com/farshazizi"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
