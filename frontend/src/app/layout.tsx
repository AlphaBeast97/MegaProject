import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Culinary Canvas",
  description: "Your assistant for cooking adventures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta
            name="google-site-verification"
            content="n1SZPGUUf7D-wS9zgMoqhz3msaeZYim_JzjgzoPLgXI"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-body antialiased">
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
