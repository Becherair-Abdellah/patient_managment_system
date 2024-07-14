import {  Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
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
  // set class className="dark" to enable darkmode 
  return (
    <html lang="en"  >
      <body className={cn("",bricolage_font.className)}>
      <ThemeProvider
            attribute="class"
            defaultTheme="night"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider></body>
    </html>
  );
}
