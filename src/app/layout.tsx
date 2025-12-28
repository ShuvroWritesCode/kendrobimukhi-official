import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kendrobimukhi - কেন্দ্রবিমুখী",
  description:
    "Kendrobimukhi is a non-profit organization dedicated to driving social change through social research and educational initiatives.",
  keywords: ["Kendrobimukhi", "non profit", "education", "social research", "KESRF", "KCDS"],
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon_io/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon_io/android-chrome-512x512.png" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-sans antialiased min-h-screen flex flex-col relative !bg-transparent`}
      >
        <div className="fixed inset-0 -z-50 bg-background" />
        <div className="fixed inset-0 -z-40 bg-[url('/images/background-image.JPG')] bg-cover bg-center opacity-20 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
