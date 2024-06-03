import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Chautary",
  description: "Explore your favorites effortlessly!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(montserrat.className, "antialiased")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
