"use client"

import { useEffect, useState } from "react"
import ShipCard from "./ShipCard"

export default function FeaturedShips() {

  const [ships, setShips] =
    useState<any[]>([])

  useEffect(() => {

    fetch("/api/featured-ships")
      .then((res) => res.json())
      .then(setShips)

  }, [])

  if (ships.length === 0) {
    return null
  }

  return (

    <section
      className="
      max-w-7xl
      mx-auto
      px-8
      py-16"
    >

      <h2
        className="
        text-4xl
        font-bold
        text-center
        mb-10"
      >
        Featured Hulls
      </h2>

      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-6"
      >

        {ships.map(
          (ship) => (

            <ShipCard
              key={ship.id}
              ship={ship}
            />

          )
        )}

      </div>

    </section>

  )

}