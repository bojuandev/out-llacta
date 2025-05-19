import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Our Llacta - Tour Virtual 3D",
  description:
    "Descubre la Riqueza Étnica del Ecuador en una Experiencia Virtual Única.",
  keywords: ["Virtual Tour", "Ecuador", "Ecuadorian cultures", "Shuar"],
  openGraph: {
    title: "Our Llacta - Tour Virtual 3D",
    description:
      "Descubre la Riqueza Étnica del Ecuador en una Experiencia Virtual Única.",
    type: "website",
    images: ["https://our-llacta.bojuan.dev/images/our-llacta-image.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Llacta - Tour Virtual 3D",
    description:
      "Descubre la Riqueza Étnica del Ecuador en una Experiencia Virtual Única.",
    images: ["https://our-llacta.bojuan.dev/images/our-llacta-image.webp"],
  },
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
    <html lang="en">
      <body className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
