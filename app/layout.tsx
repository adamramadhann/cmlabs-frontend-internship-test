import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'), // Ganti dengan domain asli saat deploy (misal: https://ramasikoki.id)
  title: 'Rama si Koki — Resep Masakan Indonesia Terlengkap',
  description: 'Temukan ribuan resep masakan lezat, tips memasak, dan panduan bahan makanan terbaik hanya di Rama si Koki. Ahlinya masakan rumahan jadi istimewa.',
  keywords: ['resep masakan', 'cara masak', 'resep indonesia', 'koki rama', 'bahan masakan', 'kuliner nusantara'],
  authors: [{ name: 'Rama si Koki' }],
  icons: {
    icon: '/logo-rsk.svg',
    shortcut: '/logo-rsk.svg',
    apple: '/logo-rsk.svg',
  },
  openGraph: {
    title: 'Rama si Koki — Resep Masakan Pilihan',
    description: 'Masak jadi lebih mudah dan menyenangkan dengan panduan dari Rama si Koki.',
    images: ['/logo-rsk.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
