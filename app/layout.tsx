import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import Layout from "@/components/Layout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "NextStep Africa - Empowering Displaced Youth",
  description: "Digital skills platform for displaced youth across Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.className} antialiased`}
      >
        <QueryProvider>
          <Layout>
            {children}
          </Layout>
        </QueryProvider>
      </body>
    </html>
  );
}
