import {  Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
const bricolage_font = Bricolage_Grotesque({
   subsets: ["latin"] ,
   weight: ['200','300','400','500','600','700'],
   variable: "--bricolage-font",
  });

export const metadata = {
  title: "AppoinHealth",
  description: "A Healthcare managment system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={cn("",bricolage_font.className)}>{children}</body>
    </html>
  );
}
