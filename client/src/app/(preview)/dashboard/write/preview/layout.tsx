export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-4 md:px-10 w-full">
      {children}
    </div>
  );
}
