import { Metadata } from "next";
import { Providers } from "@/store/Providers"; // Providers for global state/context
import "./globals.css"; // Global styles

// Define metadata for SEO purposes
export const metadata: Metadata = {
  title: "CryptoWeather Nexus",
  description: "Real-time Crypto & Weather Updates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add any additional head tags here if necessary */}
      </head>
      <body>
        {/* Wrap the entire app in Providers for global state */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
