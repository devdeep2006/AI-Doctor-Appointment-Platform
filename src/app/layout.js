
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import {dark} from "@clerk/themes";
import { ClerkProvider } from '@clerk/nextjs';
import { ToasterProvider } from "@/components/toast-provider";
const inter=Inter({subsets:["latin"]});

export const metadata = {
  title: "NovaCare- A new Revolution",
  description: "Anytime,Anywhere",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={
      {
        basetheme:'light',
      }
    }>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {/*header*/}
            <Header/>
            <ToasterProvider /> {/* ✅ Sonner toaster */}
            <main className="min-h-screen">{children}</main>
            {/*footer*/}
          </ThemeProvider>

      </body>
    </html>
    </ClerkProvider>
  );
}
