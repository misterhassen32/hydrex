import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HYDREX — Assainissement, Hydrocurage & Inspection Caméra | Intervention 24/7",
  description:
    "HYDREX : Experts en assainissement, hydrocurage haute pression et inspection caméra. Intervention rapide H24/7j dans tout le Sud de la France. Hérault, Gard, Vaucluse, Aude, Pyrénées Orientales, Bouches du Rhône.",
  keywords: [
    "assainissement",
    "hydrocurage",
    "inspection caméra",
    "débouchage",
    "curage",
    "pompage",
    "canalisation",
    "Hérault",
    "Gard",
    "Vaucluse",
    "intervention 24/7",
    "HYDREX",
  ],
  authors: [{ name: "HYDREX" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "HYDREX — L'excellence technique au service de vos réseaux",
    description:
      "Assainissement, Hydrocurage & Inspection Caméra — Intervention H24 / 7j/7",
    siteName: "HYDREX",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "HYDREX — Assainissement, Hydrocurage & Inspection Caméra",
    description:
      "Assainissement, Hydrocurage & Inspection Caméra — Intervention H24 / 7j/7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
<Script async src="https://www.googletagmanager.com/gtag/js?id=AW-18166106985" strategy="afterInteractive" />
<Script id="google-ads" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18166106985');
`}</Script>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
