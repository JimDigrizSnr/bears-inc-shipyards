"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function CataloguePage() {

  const [ships, setShips] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [statusFilter,
    setStatusFilter] =
    useState("Active")

const [search,
  setSearch] =
  useState("")

const [factionFilter,
  setFactionFilter] =
  useState("All")

const [featuredOnly,
  setFeaturedOnly] =
  useState(false)


const factions = [

  "All",

  ...new Set(
    ships
      .map(
        (ship) =>
          ship.faction
      )
      .filter(Boolean)
  )

]

  useEffect(() => {

    async function loadShips() {

      const response =
        await fetch(
          "/api/admin/catalogue"
        )

      const data =
        await response.json()

      setShips(data)

      setLoading(false)

    }

    loadShips()

  }, [])

  async function saveShip(
    ship: any
  ) {

    await fetch(
      "/api/admin/update-catalogue",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          id: ship.id,
          price: ship.price,
          stock: ship.stock,
          featured: ship.featured
        })

      }
    )

  }

  async function removeShip(
    id: number
  ) {

    const confirmed =
      confirm(
        "Remove this ship from the catalogue?"
      )

    if (!confirmed) {
      return
    }

    await fetch(
      "/api/admin/remove-from-catalogue",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          id
        })

      }
    )

    setShips(
      (prev) =>
        prev.map(
          (ship) =>
            ship.id === id
              ? {
                  ...ship,
                  active: false
                }
              : ship
        )
    )

  }

  async function restoreShip(
    id: number
  ) {

    await fetch(
      "/api/admin/restore-to-catalogue",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          id
        })

      }
    )

    setShips(
      (prev) =>
        prev.map(
          (ship) =>
            ship.id === id
              ? {
                  ...ship,
                  active: true
                }
              : ship
        )
    )

  }

const filteredShips =
  ships.filter(
    (ship) => {

      const matchesSearch =
        ship.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesFaction =
        factionFilter === "All" ||
        ship.faction === factionFilter

      const matchesFeatured =
        !featuredOnly ||
        ship.featured

      const matchesStatus =

        statusFilter === "All"

        ||

        (
          statusFilter === "Active"
          &&
          ship.active
        )

        ||

        (
          statusFilter === "Removed"
          &&
          !ship.active
        )

      return (

        matchesSearch &&
        matchesFaction &&
        matchesFeatured &&
        matchesStatus

      )

    }
  )

  if (loading) {

    return (

      <main
        className="
        max-w-7xl
        mx-auto
        p-8"
      >

        Loading Catalogue...

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
        mb-4"
      >
        Catalogue Management
      </h1>

      <div
        className="
        mb-6"
      >

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="
          p-3
          rounded-lg
          bg-slate-900
          border
          border-slate-700"
        >

          <option>
            Active
          </option>

          <option>
            Removed
          </option>

          <option>
            All
          </option>

        </select>

      </div>

<select
  value={factionFilter}
  onChange={(e) =>
    setFactionFilter(
      e.target.value
    )
  }
  className="
  p-3
  rounded-lg
  bg-slate-900
  border
  border-slate-700"
>

  {factions.map(
    (faction) => (

      <option
        key={faction}
        value={faction}
      >
        {faction}
      </option>

    )
  )}

</select>
<label
  className="
  flex
  items-center
  gap-2"
>

  <input
    type="checkbox"
    checked={featuredOnly}
    onChange={(e) =>
      setFeaturedOnly(
        e.target.checked
      )
    }
  />

  Featured Only

</label>

<input
  type="text"
  placeholder="Search ships..."
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
  className="
  w-full
  p-3
  mb-4
  rounded-lg
  bg-slate-900
  border
  border-slate-700"
/>

      <p
        className="
        text-slate-400
        mb-8"
      >
        {filteredShips.length}
        {" "}
        ships shown
      </p>

      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-6"
      >

        {filteredShips.map(
          (ship) => (

            <div
              key={ship.id}
              className="
              bg-eve-surface
              border
              border-slate-800
              rounded-xl
              overflow-hidden"
            >

              <div
                className="
                h-48
                bg-slate-800"
              >

                <Image
                  src={ship.image_url}
                  alt={ship.name}
                  width={512}
                  height={512}
                  className="
                  h-full
                  w-full
                  object-contain
                  p-2"
                />

              </div>

              <div className="p-4">

                <h3
                  className="
                  text-lg
                  font-bold"
                >
                  {ship.name}
                </h3>

                <p
                  className="
                  text-slate-400
                  text-sm"
                >
                  {ship.faction}
                </p>

                <div
                  className="
                  mt-4
                  space-y-3"
                >

                  <div>

                    <label
                      className="
                      block
                      text-sm
                      mb-1"
                    >
                      Price
                    </label>

                    <input
                      type="number"
                      defaultValue={
                        ship.price
                      }
                      onBlur={async (
                        e
                      ) => {

                        await saveShip({

                          ...ship,

                          price:
                            Number(
                              e.target
                                .value
                            )

                        })

                      }}
                      className="
                      w-full
                      p-2
                      rounded
                      bg-slate-900"
                    />

                  </div>

                  <div>

                    <label
                      className="
                      block
                      text-sm
                      mb-1"
                    >
                      Stock
                    </label>

                    <input
                      type="number"
                      defaultValue={
                        ship.stock
                      }
                      onBlur={async (
                        e
                      ) => {

                        await saveShip({

                          ...ship,

                          stock:
                            Number(
                              e.target
                                .value
                            )

                        })

                      }}
                      className="
                      w-full
                      p-2
                      rounded
                      bg-slate-900"
                    />

                  </div>

                  <label
                    className="
                    flex
                    items-center
                    gap-2"
                  >

                    <input
                      type="checkbox"
                      checked={
                        ship.featured
                      }
                      onChange={async (
                        e
                      ) => {

                        const updated =
                          {

                            ...ship,

                            featured:
                              e.target
                                .checked

                          }

                        await saveShip(
                          updated
                        )

                        setShips(
                          (prev) =>

                            prev.map(
                              (s) =>

                                s.id ===
                                ship.id

                                  ? updated

                                  : s
                            )
                        )

                      }}
                    />

                    ⭐ Featured

                  </label>

                  <div>

                    Status:

                    {" "}

                    {ship.active
                      ? "✅ Active"
                      : "❌ Removed"}

                  </div>

                  {ship.active ? (

                    <button
                      onClick={() =>
                        removeShip(
                          ship.id
                        )
                      }
                      className="
                      w-full
                      bg-red-600
                      hover:bg-red-500
                      px-3
                      py-2
                      rounded"
                    >
                      Remove
                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        restoreShip(
                          ship.id
                        )
                      }
                      className="
                      w-full
                      bg-green-600
                      hover:bg-green-500
                      px-3
                      py-2
                      rounded"
                    >
                      Restore
                    </button>

                  )}

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </main>

  )

}