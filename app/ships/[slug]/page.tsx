"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ShipPage() {
  const params = useParams();

  const slug =
    params.slug as string;

  const [ship, setShip] =
    useState<any>(null);

  useEffect(() => {

    async function loadShip() {

      const response =
        await fetch(
          `/api/ships/${slug}`
        );

      const data =
        await response.json();

      setShip(data);
    }

    if (slug) {
      loadShip();
    }

  }, [slug]);

  if (!ship) {

    return (
      <main className="max-w-7xl mx-auto p-8">
        Loading Ship...
      </main>
    );

  }

  return (

    <main
      className="
      max-w-7xl
      mx-auto
      px-8
      py-12"
    >

      <div
        className="
        grid
        lg:grid-cols-2
        gap-10
        items-start"
      >

        {/* Ship Image */}

        <div>

          <Image
            src={ship.image_url}
            alt={ship.name}
            width={1024}
            height={1024}
            className="
            w-full
            rounded-xl
            bg-slate-900
            p-6"
          />

        </div>

        {/* Right Column */}

        <div>

          <h1
            className="
            text-5xl
            font-bold
            mb-4"
          >
            {ship.name}
          </h1>

          <div className="space-y-2 mb-6">

            <p className="text-slate-400">
              {ship.faction}
            </p>

            <p className="text-slate-400">
              {ship.race}
            </p>

            <p className="text-slate-400">
              {ship.group_name}
            </p>

          </div>

          {/* Status Badges */}

          <div
            className="
            flex
            flex-wrap
            gap-2
            mb-6"
          >

            <span
              className="
              px-3
              py-1
              rounded
              bg-blue-900
              text-blue-300
              text-sm"
            >
              {ship.tech_level}
            </span>

            {ship.is_capital && (

              <span
                className="
                px-3
                py-1
                rounded
                bg-red-900
                text-red-300
                text-sm"
              >
                Capital
              </span>

            )}

            {ship.is_industrial && (

              <span
                className="
                px-3
                py-1
                rounded
                bg-orange-900
                text-orange-300
                text-sm"
              >
                Industrial
              </span>

            )}

            {ship.buildable && (

              <span
                className="
                px-3
                py-1
                rounded
                bg-green-900
                text-green-300
                text-sm"
              >
                Buildable
              </span>

            )}

          </div>

          {/* Quote Panel */}

          <div
            className="
            bg-slate-900
            rounded-xl
            p-6
            mb-6"
          >

            <div
              className="
              text-3xl
              font-bold
              text-green-400"
            >
              {(ship.price ?? 0)
                .toLocaleString()}
              {" "}
              ISK
            </div>

            {(ship.stock ?? 0) > 10 ? (

              <p
                className="
                mt-2
                text-green-400"
              >
                ✅ In Stock ({ship.stock})
              </p>

            ) : (ship.stock ?? 0) > 0 ? (

              <p
                className="
                mt-2
                text-yellow-400"
              >
                🟡 Limited Stock ({ship.stock})
              </p>

            ) : (

              <p
                className="
                mt-2
                text-blue-400"
              >
                Build To Order
              </p>

            )}

            <a
              href={`/quote-request?ship=${encodeURIComponent(
                ship.name
              )}`}
              className="
              inline-block
              mt-4
              bg-amber-400
              text-black
              px-6
              py-3
              rounded-xl
              font-bold"
            >
              Request Quote
            </a>

          </div>

          {/* Ship + Fitting Information */}

          <div
            className="
            bg-slate-900
            rounded-xl
            p-6"
          >

            <h2
              className="
              text-xl
              font-bold
              mb-4"
            >
              Ship Information
            </h2>

            <div
              className="
              grid
              grid-cols-2
              gap-x-8
              gap-y-3"
            >

              <div className="text-slate-400">
                Race
              </div>
              <div>{ship.race}</div>

              <div className="text-slate-400">
                Faction
              </div>
              <div>{ship.faction}</div>

              <div className="text-slate-400">
                Class
              </div>
              <div>{ship.group_name}</div>

              <div className="text-slate-400">
                Tech Level
              </div>
              <div>{ship.tech_level}</div>

              <div className="text-slate-400">
                High Slots
              </div>
              <div>{ship.high_slots ?? 0}</div>

              <div className="text-slate-400">
                Mid Slots
              </div>
              <div>{ship.mid_slots ?? 0}</div>

              <div className="text-slate-400">
                Low Slots
              </div>
              <div>{ship.low_slots ?? 0}</div>

              <div className="text-slate-400">
                Turrets
              </div>
              <div>{ship.turret_hardpoints ?? 0}</div>

              <div className="text-slate-400">
                Launchers
              </div>
              <div>{ship.launcher_hardpoints ?? 0}</div>

            </div>

          </div>

        </div>

      </div>

      {/* Defence + Description */}

      <div
        className="
        grid
        lg:grid-cols-2
        gap-6
        mt-10"
      >

        <div
          className="
          bg-slate-900
          rounded-xl
          p-6"
        >

          <h2
            className="
            text-xl
            font-bold
            mb-4"
          >
            Defence
          </h2>

          <div className="space-y-3">

            <div>
              Shield HP:{" "}
              {(ship.shield_hp ?? 0)
                .toLocaleString()}
            </div>

            <div>
              Armour HP:{" "}
              {(ship.armor_hp ?? 0)
                .toLocaleString()}
            </div>

            <div>
              Structure HP:{" "}
              {(ship.structure_hp ?? 0)
                .toLocaleString()}
            </div>

          </div>

        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-6"
        >

          <h2
            className="
            text-xl
            font-bold
            mb-4"
          >
            Description
          </h2>

          <div className="text-slate-300">
            {ship.description}
          </div>

        </div>

      </div>

    </main>

  );
}
