import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-100">
        <Header />
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
