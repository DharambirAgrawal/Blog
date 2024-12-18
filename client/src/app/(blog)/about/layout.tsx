import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <nav className="w-full md:w-1/4">
        <Navbar />
      </nav>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
