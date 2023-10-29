export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-12">
      {children}
    </div>
  );
}
