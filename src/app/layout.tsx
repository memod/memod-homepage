import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <head>
            <!-- Google tag (gtag.js) -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZV5R4GG7QS"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    window?.dataLayer?.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', 'G-ZV5R4GG7QS');
            </script>
            <title>Carlos G. Durazo - Software Engineer</title>
          </head>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
          </body>
      </html>
  );
}
