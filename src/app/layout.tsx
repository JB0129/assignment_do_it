import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./Header";

export const metadata: Metadata = {
  title: "할 일 목록 페이지",
  description: "진행 중인 할일과 완료된 할 일을 나누어 볼 수 있습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="flex flex-col justify-start items-center w-full">
        <Header />
        {children}
      </body>
    </html>
  );
}
