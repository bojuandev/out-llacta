import "./globals.css";
import { Providers } from "./providers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_60%_30%,rgba(255,195,0,0.3),rgba(255,255,255,0))]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
