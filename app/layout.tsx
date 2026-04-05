import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asela Shopping Web",
  description: "Online shopping for Asela Town, Ethiopia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
