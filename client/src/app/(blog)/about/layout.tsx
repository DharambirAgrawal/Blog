import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-row w-full max-sm:flex-col wrapper">
        <nav className="min-w-48 max-md:min-w-36 max-sm:w-full">
          <Navbar />
        </nav>
        <section>{children}</section>
      </div>
    </>
  );
}
