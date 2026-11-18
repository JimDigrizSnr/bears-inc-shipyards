// app/ships/page.tsx

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ShipsPage() {

  const [ships, setShips] =
    useState<any[]>([])

  const [search, setSearch] =
    useState("")

  const [factionFilter,
    setFactionFilter] =
    useState("All")

  useEffect(() => {

    fetch("/api/ships")
      .then(
        res => res.json()
      )
      .then(
        setShips
      )

  }, [])

  const factions = [

    "All",

    ...new Set(
      ships
        .map(
          ship =>
            ship.faction
        )
        .filter(Boolean)
    )

  ]

  const filteredShips =
    ships.filter(
      ship => {

        const matchesSearch =

          ship.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        const matchesFaction =

          factionFilter ===
            "All"

          ||

          ship.faction ===
            factionFilter

        return (
          matchesSearch &&
          matchesFaction
        )

      }
    )

  const groupedShips =
    filteredShips.reduce(
      (groups, ship) => {

        const category =
          ship.hull_class ??
          "Other"

        if (
          !groups[category]
        ) {

          groups[
            category
          ] = []

        }

        groups[
          category
        ].push(ship)

        return groups

      },

      {} as Record<
        string,
        any[]
      >
    )

  const categoryOrder = [

    "Corvette",

    "Frigate",

    "Destroyer",

    "Cruiser",

    "Battlecruiser",

    "Battleship",

    "Industrial",

    "Mining Barge",

    "Exhumer",

    "Freighter",

    "Dreadnought",

    "Carrier",

    "Force Auxiliary",

    "Supercarrier",

    "Titan"

  ]

  const categories =
    Object.keys(
      groupedShips
    ).sort(
      (a, b) => {

        const aIndex =
          categoryOrder.indexOf(
            a
          )

        const bIndex =
          categoryOrder.indexOf(
            b
          )

        if (
          aIndex === -1 &&
          bIndex === -1
        ) {
          return a.localeCompare(
            b
          )
        }

        if (
          aIndex === -1
        ) {
          return 1
        }

        if (
          bIndex === -1
        ) {
          return -1
        }

        return (
          aIndex -
          bIndex
        )

      }
    )

  return (

    <main
      className="
      max-w-7xl
      mx-auto
      px-8
      py-12"
    >

      <h1
        className="
        text-5xl
        font-bold
        mb-4"
      >
        Featured Hulls
      </h1>

      <p
        className="
        text-slate-400
        mb-8"
      >
         Available for Build or Immediate Delivery if in stock
      </p>

            <p
        className="
        text-slate-400
        mb-8"
      >
        Browse the Bears Inc
        Shipyards catalogue
        and request quotations.
      </p>

      <div
        className="
        grid
        md:grid-cols-2
        gap-4
        mb-8"
      >

        <input
          type="text"
          placeholder="Search hulls..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
          p-4
          rounded-xl
          bg-slate-900"
        />

        <select
          value={
            factionFilter
          }
          onChange={(e) =>
            setFactionFilter(
              e.target.value
            )
          }
          className="
          p-4
          rounded-xl
          bg-slate-900"
        >

          {factions.map(
            faction => (

              <option
                key={faction}
              >
                {faction}
              </option>

            )
          )}

        </select>

      </div>

      {/* Category Navigation */}

      <div
        className="
        flex
        flex-wrap
        gap-3
        mb-10"
      >

        {categories.map(
          category => (

            <a
              key={category}
              href={`#${category}`}
              className="
              px-4
              py-2
              rounded-full
              bg-slate-900
              hover:bg-amber-400
              hover:text-black
              transition"
            >
              {category}
              {" "}
              (
              {
                groupedShips[
                  category
                ].length
              }
              )
            </a>

          )
        )}

      </div>

      {categories.map(
        category => (

          <section
            id={category}
            key={category}
            className="
            mb-16
            scroll-mt-24"
          >

            <h2
              className="
              text-3xl
              font-bold
              mb-6
              border-b
              border-slate-700
              pb-2"
            >
              {category}
            </h2>

            <div
              className="
              grid
              md:grid-cols-2
              lg:grid-cols-4
              gap-6"
            >

              {groupedShips[
                category
              ].map(
                ship => (

                  <Link
                    key={ship.id}
                    href={
                      `/ships/${ship.slug}`
                    }
                  >

                    <div
                      className="
                      bg-slate-900
                      rounded-xl
                      overflow-hidden
                      hover:border
                      hover:border-amber-400
                      transition"
                    >

                      <div
                        className="
                        h-56"
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
                          p-4"
                        />

                      </div>

                      <div
                        className="
                        p-4"
                      >

                        <h3
                          className="
                          text-lg
                          font-bold"
                        >
                          {ship.name}
                        </h3>

                        <p
                          className="
                          text-sm
                          text-slate-400"
                        >
                          {ship.faction}
                        </p>

                        <p
                          className="
                          mt-3
                          text-green-400"
                        >
                          {ship.stock}
                          {" "}
                          in stock
                        </p>

                        <p
                          className="
                          mt-2
                          text-amber-400
                          font-bold"
                        >
                          {ship.price?.toLocaleString()}
                          {" "}
                          ISK
                        </p>

                      </div>

                    </div>

                  </Link>

                )
              )}

            </div>

          </section>

        )
      )}

    </main>

  )

}