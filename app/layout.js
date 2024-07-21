import {  Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
const bricolage_font = Bricolage_Grotesque({
   subsets: ["latin"] ,
   weight: ['200','300','400','500','600','700'],
   variable: "--bricolage-font",
  });

export const metadata = {
  title: "AppointHealth",
  description: "A Healthcare managment system",
};

export default function RootLayout({ children }) {
  // set class className="dark" to enable darkmode 
  return (
    <html lang="en"  >
      <body className={cn("",bricolage_font.className)}>
            {children}
          </body>
    </html>
  );
}
