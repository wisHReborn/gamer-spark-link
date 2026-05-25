import type { Metadata } from "next";
import { Kanit, Orbitron } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-kanit",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "800", "900"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "PREEE REBORN — Streamer Hub & Donation",
  description: "ศูนย์รวมลิงก์และช่องทางสนับสนุนของสตรีมเมอร์ PREEE REBORN — โดเนท, โซเชียล, สเปคเครื่อง และคอมมูนิตี้",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <body className={`${kanit.variable} ${orbitron.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
