"use client"

import { useEffect, useState } from "react"
import ShipCard from "./ShipCard"

export default function ShipGrid() {
  const [ships, setShips] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/ships")
      .then((res) => res.json())
      .then(setShips)
  }, [])

  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-6"
    >
      {ships.map((ship) => (
        <ShipCard
          key={ship.id}
          ship={ship}
        />
      ))}
    </div>
  )
}
