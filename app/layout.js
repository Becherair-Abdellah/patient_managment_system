import {  Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import cn from 'clsx'
import { ThemeProvider } from "@/components/theme-provider";
const bricolage_font = Bricolage_Grotesque({
   subsets: ["latin"] ,
   weight: ['200','300','400','500','600','700'],
   variable: "--bricolage-font",
  });
  import { Our_provider } from "@/redux/Our_provider";
export const metadata = {
  title: "AppointHealth",
  description: "A Healthcare managment system",
};
export default function RootLayout({ children }) {
  // set class className="dark" to enable darkmode 
  
  return (
    <html lang="en"  >
      
      <body className={cn("",bricolage_font.className)}>
        <Our_provider>
      <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          </Our_provider>
          </body>
    </html>
  );
}
