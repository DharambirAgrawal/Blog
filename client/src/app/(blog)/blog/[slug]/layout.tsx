import Subscribe from "@/components/main/Subscribe";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full h-14"></div>
      <main className="">
        {children}
        <Subscribe />
      </main>
    </>
  );
}
