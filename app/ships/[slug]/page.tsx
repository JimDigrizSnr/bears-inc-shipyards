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

        <div
          className="
          lg:sticky
          lg:top-24"
        >

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
            mb-3"
          >
            {ship.name}
          </h1>

          <div className="mb-6">

            <p className="text-slate-400">

              {ship.faction}

              {ship.race !== ship.faction &&
                ` • ${ship.race}`}

            </p>

            <p
              className="
              text-slate-400
              mt-2"
            >
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

          {/* Price & Quote */}

          <div className="mb-6">

            <div
              className="
              text-4xl
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
    mb-6"
  >
    Ship Specifications
  </h2>

  <div
    className="
    grid
    md:grid-cols-2
    gap-8"
  >

    <div>

      <h3
        className="
        font-semibold
        mb-4
        text-slate-300"
      >
        Fitting
      </h3>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>High Slots</span>
          <span>{ship.high_slots ?? 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Mid Slots</span>
          <span>{ship.mid_slots ?? 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Low Slots</span>
          <span>{ship.low_slots ?? 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Turrets</span>
          <span>
            {ship.turret_hardpoints ?? 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Launchers</span>
          <span>
            {ship.launcher_hardpoints ?? 0}
          </span>
        </div>

      </div>

    </div>

    <div>

      <h3
        className="
        font-semibold
        mb-4
        text-slate-300"
      >
        Defence
      </h3>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>🟦 Shield HP</span>
          <span>
            {(ship.shield_hp ?? 0)
              .toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>🟨 Armour HP</span>
          <span>
            {(ship.armor_hp ?? 0)
              .toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>🟥 Structure HP</span>
          <span>
            {(ship.structure_hp ?? 0)
              .toLocaleString()}
          </span>
        </div>

      </div>

    </div>

  </div>

</div>

</div>

</div>

      {/* Description */}

      <div
        className="
        bg-slate-900
        rounded-xl
        p-6
        mt-10"
      >

        <h2
          className="
          text-xl
          font-bold
          mb-4"
        >
          Description
        </h2>

        <div
          className="
          text-slate-300
          whitespace-pre-wrap"
        >
          {ship.description}
        </div>

      </div>

    </main>

  );
}