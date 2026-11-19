"use client";

import { useEffect, useState } from "react";
import ShipCard from "@/components/ships/ShipCard";

export default function ShipsPage() {
  const [ships, setShips] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [factionFilter,
    setFactionFilter] =
    useState("All");

  const [techFilter,
    setTechFilter] =
    useState("All");

  const [capitalFilter,
    setCapitalFilter] =
    useState("All");

  useEffect(() => {

    fetch("/api/ships")
      .then(res => res.json())
      .then((data) => {

        const catalogueShips =
          data.filter(
            (ship: any) =>
              ship.buildable === true &&
              ship.player_ownable === true
          );

        setShips(catalogueShips);
      });

  }, []);

  const factions = [
    "All",
    ...new Set(
      ships
        .map(
          ship => ship.faction
        )
        .filter(Boolean)
    )
  ];

  const filteredShips =
    ships.filter((ship) => {

      const matchesSearch =
        ship.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFaction =
        factionFilter === "All"
        ||
        ship.faction ===
        factionFilter;

      const matchesTech =
        techFilter === "All"
        ||
        ship.tech_level ===
        techFilter;

      const matchesCapital =

        capitalFilter === "All"

          ? true

          : capitalFilter ===
              "Capital"

          ? ship.is_capital

          : !ship.is_capital;

      return (
        matchesSearch &&
        matchesFaction &&
        matchesTech &&
        matchesCapital
      );

    });

  const groupedShips =
    filteredShips.reduce(
      (groups, ship) => {

        const category =
          ship.group_name ??
          ship.hull_class ??
          "Other";

        if (!groups[category]) {
          groups[category] = [];
        }

        groups[category].push(ship);

        return groups;

      },
      {} as Record<
        string,
        any[]
      >
    );

  const categoryOrder = [

    "Corvette",

    "Frigate",
    "Navy Frigate",
    "Assault Frigate",
    "Interceptor",
    "Covert Ops",
    "Electronic Attack Ship",

    "Destroyer",
    "Tactical Destroyer",
    "Command Destroyer",

    "Cruiser",
    "Heavy Assault Cruiser",
    "Heavy Interdiction Cruiser",
    "Recon Ship",
    "Logistics",

    "Strategic Cruiser",

    "Battlecruiser",
    "Combat Battlecruiser",
    "Command Ship",

    "Battleship",
    "Black Ops",
    "Marauder",

    "Industrial",
    "Transport Ship",
    "Blockade Runner",
    "Deep Space Transport",

    "Mining Barge",
    "Exhumer",

    "Industrial Command Ship",

    "Freighter",
    "Jump Freighter",

    "Capital Industrial Ship",

    "Carrier",
    "Dreadnought",
    "Force Auxiliary",

    "Supercarrier",
    "Titan"
  ];

  const categories =
    Object.keys(
      groupedShips
    ).sort((a, b) => {

      const aIndex =
        categoryOrder.indexOf(a);

      const bIndex =
        categoryOrder.indexOf(b);

      if (
        aIndex === -1 &&
        bIndex === -1
      ) {
        return a.localeCompare(b);
      }

      if (aIndex === -1) {
        return 1;
      }

      if (bIndex === -1) {
        return -1;
      }

      return (
        aIndex - bIndex
      );

    });

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
        Bears Inc Ship Catalogue
      </h1>

      <p
        className="
        text-slate-400
        mb-3"
      >
        Browse all ships currently
        available for manufacture
        through Bears Inc Shipyards.
      </p>

      <p
        className="
        text-slate-500
        mb-8"
      >
        Search, compare and request
        quotations for over
        400 manufacturable ship hulls.
      </p>

      <div
        className="
        mb-8
        text-amber-400
        font-semibold"
      >
        {filteredShips.length}
        {" "}
        Ships Available
      </div>

      {/* Filters */}

      <div
        className="
        grid
        md:grid-cols-4
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
          value={factionFilter}
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
          ))}
        </select>

        <select
          value={techFilter}
          onChange={(e) =>
            setTechFilter(
              e.target.value
            )
          }
          className="
          p-4
          rounded-xl
          bg-slate-900"
        >
          <option>
            All
          </option>

          <option>
            Tech I
          </option>

          <option>
            Tech II
          </option>

          <option>
            Tech III
          </option>

        </select>

        <select
          value={
            capitalFilter
          }
          onChange={(e) =>
            setCapitalFilter(
              e.target.value
            )
          }
          className="
          p-4
          rounded-xl
          bg-slate-900"
        >
          <option>
            All
          </option>

          <option>
            Capital
          </option>

          <option>
            Subcapital
          </option>

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
          (category) => (

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

      {/* Ship Categories */}

      {categories.map(
        (category) => (

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
      )}

    </main>
  );
}