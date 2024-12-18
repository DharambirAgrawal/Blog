import Footer from "@/components/main/Footer";
import Navigation from "@/components/main/Navigation";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className=" mt-10">{children}</main>
      <Footer />
    </>
  );
}
