"use client"

import { useEffect, useState } from "react"

export default function Stats() {

  const [stats, setStats] =
    useState<any>(null)

  useEffect(() => {

    fetch("/api/stats")
      .then((res) => res.json())
      .then(setStats)

  }, [])

  if (!stats) {
    return null
  }

  return (

    <section
      className="
      max-w-7xl
      mx-auto
      py-16
      px-8"
    >

      <div
        className="
        grid
        md:grid-cols-3
        gap-8
        text-center"
      >

        <div>

          <div
            className="
            text-5xl
            font-bold
            text-eve-accent"
          >
            {stats.activeShips}
          </div>

          <div>
            Ships In Catalogue
          </div>

        </div>

        <div>

          <div
            className="
            text-5xl
            font-bold
            text-eve-accent"
          >
            {stats.featuredShips}
          </div>

          <div>
            Featured Hulls
          </div>

        </div>

        <div>

          <div
            className="
            text-5xl
            font-bold
            text-eve-accent"
          >
            {stats.totalStock}
          </div>

          <div>
            Hulls In Stock
          </div>

        </div>

      </div>

    </section>

  )

}