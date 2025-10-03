import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChakraUIProvider } from "@/lib/chakra-provider";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Financial Dashboard",
  description: "Dashboard financeiro criado com Next.js, TypeScript, Chakra UI e Styled Components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          <ChakraUIProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ChakraUIProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
