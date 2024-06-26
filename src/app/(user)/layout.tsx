import Footer from "@/components/footer";
import Header from "@/components/header";

export default function RootUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
