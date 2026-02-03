import "./globals.css";

export const metadata = {
  title: "Suav — OURO",
  description: "OURO by Suav",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
