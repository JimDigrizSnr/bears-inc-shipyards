"use client"

import {
  useEffect,
  useState
} from "react"

export default function InventoryPage() {

  const [ships,
    setShips] =
    useState<any[]>([])

  const [loading,
    setLoading] =
    useState(true)

  useEffect(() => {

    async function loadInventory() {

      const response =
        await fetch(
          "/api/admin/inventory"
        )

      const data =
        await response.json()

      setShips(data)

      setLoading(false)

    }

    loadInventory()

  }, [])

  if (loading) {

    return (

      <main
        className="
        max-w-7xl
        mx-auto
        p-8"
      >

        Loading Inventory...

      </main>

    )

  }

  return (

    <main
      className="
      max-w-7xl
      mx-auto
      p-8"
    >

      <h1
        className="
        text-4xl
        font-bold
        mb-8"
      >
        Inventory Dashboard
      </h1>

      <table
        className="
        w-full"
      >

        <thead>

          <tr
            className="
            border-b
            border-slate-700"
          >

            <th className="text-left p-3">
              Ship
            </th>

            <th className="text-left p-3">
              Faction
            </th>

            <th className="text-left p-3">
              Stock
            </th>

            <th className="text-left p-3">
              Value
            </th>

          </tr>

        </thead>

        <tbody>

          {ships.map(
            (ship) => (

              <tr
                key={ship.id}
                className="
                border-b
                border-slate-800"
              >

                <td className="p-3">
                  {ship.name}
                </td>

                <td className="p-3">
                  {ship.faction}
                </td>

                <td
                  className={`
                    p-3

                    ${
                      ship.stock < 5
                        ? "text-red-400"
                        : ship.stock < 10
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                  `}
                >
                  {ship.stock}
                </td>

                <td className="p-3">

                  {(
                    ship.stock *
                    ship.price
                  ).toLocaleString()}
                  {" "}
                  ISK

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </main>

  )

}