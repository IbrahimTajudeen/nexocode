import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppReduxProvider } from "@/components/redux-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "Ibrahim Tajudeen | Software Engineer & Portfolio",
  description: "Backend Systems • Fintech Infrastructure • Modern Web Applications. Software Engineer experienced in building scalable backend systems, fintech infrastructure, AI-powered platforms, and cross-platform applications.",
  keywords: ["Software Engineer", "Backend", "Fintech", "NestJS", "React", "C#", "PostgreSQL", "API Development"],
  authors: [{ name: "Ibrahim Tajudeen" }],
  openGraph: {
    title: "Ibrahim Tajudeen | Software Engineer & Portfolio",
    description: "Backend Systems • Fintech Infrastructure • Modern Web Applications",
    type: "website",
    url: "https://www.nexocode.vercel.app",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark theme-blue">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <AppReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppReduxProvider>
      </body>
    </html>
  )
}
