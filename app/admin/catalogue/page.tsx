"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CataloguePage() {

  const [ships, setShips] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [statusFilter,
    setStatusFilter] =
    useState("Active");

  const [search,
    setSearch] =
    useState("");

  const [factionFilter,
    setFactionFilter] =
    useState("All");

  const [featuredOnly,
    setFeaturedOnly] =
    useState(false);

  const [techFilter,
    setTechFilter] =
    useState("All");

  const [capitalFilter,
    setCapitalFilter] =
    useState("All");

  const [buildableFilter,
    setBuildableFilter] =
    useState("All");

  useEffect(() => {

    async function loadShips() {

      const response =
        await fetch(
          "/api/admin/catalogue"
        );

      const data =
        await response.json();

      setShips(data);
      setLoading(false);
    }

    loadShips();

  }, []);

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
    );
  }

  async function removeShip(
    id: number
  ) {

    const confirmed =
      confirm(
        "Remove this ship from the catalogue?"
      );

    if (!confirmed) {
      return;
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
    );

    setShips(prev =>
      prev.map(ship =>
        ship.id === id
          ? {
              ...ship,
              active: false
            }
          : ship
      )
    );
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
    );

    setShips(prev =>
      prev.map(ship =>
        ship.id === id
          ? {
              ...ship,
              active: true
            }
          : ship
      )
    );
  }

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
    ships.filter(
      (ship) => {

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

        const matchesFeatured =
          !featuredOnly
          ||
          ship.featured;

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
          );

        const matchesTech =
          techFilter === "All"
          ||
          ship.tech_level ===
          techFilter;

        const matchesCapital =
          capitalFilter === "All"
          ||
          (
            capitalFilter ===
              "Capital"
              ? ship.is_capital
              : !ship.is_capital
          );

        const matchesBuildable =
          buildableFilter === "All"
          ||
          (
            buildableFilter ===
              "Buildable"
              ? ship.buildable
              : !ship.buildable
          );

        return (
          matchesSearch &&
          matchesFaction &&
          matchesFeatured &&
          matchesStatus &&
          matchesTech &&
          matchesCapital &&
          matchesBuildable
        );

      }
    );

  const totalShips =
    ships.length;

  const buildableShips =
    ships.filter(
      s => s.buildable
    ).length;

  const capitalShips =
    ships.filter(
      s => s.is_capital
    ).length;

  const featuredShips =
    ships.filter(
      s => s.featured
    ).length;

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

    );
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
        mb-2"
      >
        Catalogue Management
      </h1>

      <p
        className="
        text-slate-400
        mb-8"
      >
        Manage availability,
        pricing and featured
        ship listings.
      </p>

      {/* Dashboard */}

      <div
        className="
        grid
        md:grid-cols-4
        gap-4
        mb-8"
      >

        <div className="bg-slate-900 rounded-xl p-4">
          <div className="text-slate-400">
            Total Ships
          </div>

          <div className="text-3xl font-bold">
            {totalShips}
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <div className="text-slate-400">
            Buildable
          </div>

          <div className="text-3xl font-bold text-green-400">
            {buildableShips}
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <div className="text-slate-400">
            Capital Ships
          </div>

          <div className="text-3xl font-bold text-red-400">
            {capitalShips}
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <div className="text-slate-400">
            Featured
          </div>

          <div className="text-3xl font-bold text-amber-400">
            {featuredShips}
          </div>
        </div>

      </div>

      {/* Filters */}

      <div
        className="
        grid
        md:grid-cols-4
        gap-4
        mb-6"
      >

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
          p-3
          rounded-lg
          bg-slate-900
          border
          border-slate-700"
        />

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
          <option>Active</option>
          <option>Removed</option>
          <option>All</option>
        </select>

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
            faction => (
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
          value={techFilter}
          onChange={(e) =>
            setTechFilter(
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
          <option>All</option>
          <option>Tech I</option>
          <option>Tech II</option>
          <option>Tech III</option>
        </select>

      </div>

      <div
        className="
        grid
        md:grid-cols-3
        gap-4
        mb-8"
      >

        <select
          value={capitalFilter}
          onChange={(e) =>
            setCapitalFilter(
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
          <option>All</option>
          <option>Capital</option>
          <option>Subcapital</option>
        </select>

        <select
          value={buildableFilter}
          onChange={(e) =>
            setBuildableFilter(
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
          <option>All</option>
          <option>Buildable</option>
          <option>Not Buildable</option>
        </select>

        <label
          className="
          flex
          items-center
          gap-2"
        >
          <input
            type="checkbox"
            checked={
              featuredOnly
            }
            onChange={(e) =>
              setFeaturedOnly(
                e.target.checked
              )
            }
          />

          Featured Only
        </label>

      </div>

      <p
        className="
        text-slate-400
        mb-8"
      >
        {filteredShips.length}
        {" "}
        ships shown
      </p>

      {/* Cards */}

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

                <p
                  className="
                  text-slate-500
                  text-xs"
                >
                  {ship.race}
                </p>

                <p
                  className="
                  text-slate-500
                  text-xs"
                >
                  {ship.group_name}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">

                  <span
                    className="
                    bg-blue-900
                    text-blue-300
                    px-2
                    py-1
                    rounded
                    text-xs"
                  >
                    {ship.tech_level}
                  </span>

                  {ship.is_capital && (
                    <span
                      className="
                      bg-red-900
                      text-red-300
                      px-2
                      py-1
                      rounded
                      text-xs"
                    >
                      Capital
                    </span>
                  )}

                  {ship.buildable && (
                    <span
                      className="
                      bg-green-900
                      text-green-300
                      px-2
                      py-1
                      rounded
                      text-xs"
                    >
                      Buildable
                    </span>
                  )}

                </div>

                <div className="mt-4 space-y-3">

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
                              e.target.value
                            )
                        });

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
                              e.target.value
                            )
                        });

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
                          };

                        await saveShip(
                          updated
                        );

                        setShips(
                          prev =>
                            prev.map(
                              s =>
                                s.id ===
                                ship.id
                                  ? updated
                                  : s
                            )
                        );

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

  );
}