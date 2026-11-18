
              "use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function EveShipsPage() {
  const [ships, setShips] =
    useState<any[]>([])

  const [catalogueShips,
    setCatalogueShips] =
    useState<number[]>([])

  const [search, setSearch] =
    useState("")

  const [selectedFaction,
    setSelectedFaction] =
    useState("All")

  const [selectedHull,
    setSelectedHull] =
    useState("All")

const [showUncataloguedOnly,
  setShowUncataloguedOnly] =
  useState(false)

  const [loading,
    setLoading] =
    useState(false)

  useEffect(() => {

    async function loadData() {

      const shipsResponse =
        await fetch("/api/eve-ships")

      const shipsData =
        await shipsResponse.json()

      setShips(shipsData)

      const catalogueResponse =
        await fetch(
          "/api/admin/eve-ships-status"
        )

      const catalogueData =
        await catalogueResponse.json()

      setCatalogueShips(

        catalogueData.map(
          (ship: any) =>
            ship.type_id
        )

      )

    }

    loadData()

  }, [])

  function isInCatalogue(
    typeId: number
  ) {

    return catalogueShips.includes(
      typeId
    )

  }

  async function addToCatalogue(
    typeId: number
  ) {

    setLoading(true)

    try {

      const response =
        await fetch(
          "/api/admin/add-to-catalogue",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              type_id: typeId
            })

          }
        )

      const result =
        await response.json()

      if (!response.ok) {

        alert(
          result.error ??
          "Failed to add ship"
        )

        return

      }

      setCatalogueShips(
        (prev) => [

          ...prev,

          typeId

        ]
      )

      alert(
        result.message ??
        "Added to catalogue"
      )

    } catch (error) {

      console.error(error)

      alert(
        "Unable to add ship"
      )

    }

    setLoading(false)

  }

async function removeFromCatalogue(
  typeId: number
) {

  const confirmed =
    confirm(
      "Remove this ship from the catalogue?"
    )

  if (!confirmed) {
    return
  }

  try {

    const response =
      await fetch(
        "/api/admin/remove-from-catalogue",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            type_id: typeId
          })

        }
      )

    const result =
      await response.json()

    if (!response.ok) {

      alert(
        result.error
      )

      return

    }

    setCatalogueShips(
      (prev) =>
        prev.filter(
          (id) =>
            id !== typeId
        )
    )

  } catch (error) {

    console.error(error)

    alert(
      "Unable to remove ship"
    )

  }

}

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

  const hullClasses = [

    "All",

    ...new Set(
      ships
        .map(
          (ship) =>
            ship.hull_class
        )
        .filter(Boolean)
    )

  ]

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
        selectedFaction === "All" ||
        ship.faction === selectedFaction

      const matchesHull =
        selectedHull === "All" ||
        ship.hull_class === selectedHull

      const matchesCatalogue =
        !showUncataloguedOnly ||
        !isInCatalogue(ship.type_id)

      return (
        matchesSearch &&
        matchesFaction &&
        matchesHull &&
        matchesCatalogue
      )

    }
  )

  return (

    <main
      className="
      max-w-7xl
      mx-auto
      px-8
      py-10"
    >

      <h1
        className="
        text-4xl
        font-bold
        mb-2"
      >
        EVE Ship Master Data
      </h1>

<p
  className="
  text-slate-400
  mb-8"
>
  {ships.length} hulls imported
  {" • "}
  {catalogueShips.length} in catalogue
  {" • "}
  {ships.length - catalogueShips.length} available to add
</p>

      <div
        className="
        grid
        md:grid-cols-2
        gap-4
        mb-4"
      >

        <select
          value={
            selectedFaction
          }
          onChange={(e) =>
            setSelectedFaction(
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

        <select
          value={
            selectedHull
          }
          onChange={(e) =>
            setSelectedHull(
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

          {hullClasses.map(
            (hull) => (

              <option
                key={hull}
                value={hull}
              >
                {hull}
              </option>

            )
          )}

        </select>

      </div>

<label
  className="
  flex
  items-center
  gap-3
  mb-6
  text-sm"
>

  <input
    type="checkbox"
    checked={
      showUncataloguedOnly
    }
    onChange={(e) =>
      setShowUncataloguedOnly(
        e.target.checked
      )
    }
  />

  Show only ships not in catalogue

</label>

      <input
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        placeholder="
        Search ships..."
        className="
        w-full
        p-3
        mb-8
        rounded-lg
        bg-slate-900
        border
        border-slate-700"
      />

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
              key={
                ship.type_id
              }
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
                  src={
                    ship.image_url
                  }
                  alt={
                    ship.name
                  }
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
                  text-sm
                  mt-2"
                >
                  {ship.group_name}
                </p>

                <p
                  className="
                  text-eve-accent
                  text-sm
                  mt-1"
                >
                  {ship.faction}
                </p>

                <p
                  className="
                  text-slate-500
                  text-xs
                  mt-1"
                >
                  {ship.tech_level}
                </p>

                {isInCatalogue(
                  ship.type_id
                ) ? (

                  <div
                    className="
                    mt-4
                    text-green-400
                    font-semibold"
                  >
                    <div
  className="
  mt-4
  space-y-2"
>

  <div
    className="
    text-green-400
    font-semibold"
  >
    ✅ In Catalogue
  </div>

  <button
    onClick={() =>
      removeFromCatalogue(
        ship.type_id
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

</div>

                  </div>

                ) : (

                  <button
                    onClick={() =>
                      addToCatalogue(
                        ship.type_id
                      )
                    }
                    disabled={
                      loading
                    }
                    className="
                    mt-4
                    w-full
                    bg-green-600
                    hover:bg-green-500
                    disabled:bg-slate-700
                    px-3
                    py-2
                    rounded"
                  >
                    Add To Catalogue
                  </button>

                )}

              </div>

            </div>

          )
        )}

      </div>

    </main>

  )

}