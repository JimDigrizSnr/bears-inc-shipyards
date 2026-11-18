import "./globals.css"
import type { Metadata } from "next"
import NavBar from "@/components/NavBar"

export const metadata: Metadata = {
  title: "Bears Inc Shipyards",
  description:
    "Industrial Manufacturing and Fleet Procurement for New Eden"
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body
        className="
        bg-eve-background
        text-white
        min-h-screen"
      >

        <NavBar />

        <main>

          {children}

        </main>

      </body>

    </html>
  )
}