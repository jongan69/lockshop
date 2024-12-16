import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from '@/components/WalletProvider';
import Header from '@/components/Header'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lockshop",
  description: "Lockshop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <Header />
          <main>
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}
