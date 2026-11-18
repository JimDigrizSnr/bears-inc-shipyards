"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminNav() {

  const pathname =
    usePathname()

  const links = [

    {
      href: "/admin",
      label: "Dashboard"
    },

    {
      href: "/admin/eve-ships",
      label: "Ship Master Data"
    },

    {
      href: "/admin/catalogue",
      label: "Catalogue"
    },

    {
      href: "/admin/quotes",
      label: "Quotes"
    },

    {
      href: "/admin/production",
      label: "Production"
    },

{
  href: "/admin/inventory",
  label: "Inventory"
}


  ]

  return (

    <nav
      className="
      bg-slate-950
      border-b
      border-slate-800"
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6"
      >

        <div
          className="
          flex
          gap-4
          overflow-x-auto
          py-4"
        >

          {links.map(
            (link) => (

              <Link
                key={link.href}
                href={link.href}
                className={`
                  px-4
                  py-2
                  rounded

                  ${
                    pathname === link.href
                      ? "bg-eve-accent text-black"
                      : "bg-slate-900"
                  }
                `}
              >
                {link.label}
              </Link>

            )
          )}

        </div>

      </div>

    </nav>

  )

}