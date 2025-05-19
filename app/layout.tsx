import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: 'Our Llacta - Tour Virtual 3D',
  description: 'Descripción optimizada para SEO.',
  keywords: ['Virtual Tour', 'Ecuador', 'Ecuadorian cultures'],
  openGraph: {
    title: 'Our Llacta - Tour Virtual 3D',
    description: 'Descripción optimizada para SEO.',
    type: 'website',
    images: ['https://tusitio.com/imagen.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Llacta - Tour Virtual 3D',
    description: 'Descripción optimizada para SEO.',
    images: ['https://tusitio.com/imagen.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
