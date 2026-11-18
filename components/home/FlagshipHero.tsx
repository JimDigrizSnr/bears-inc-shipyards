"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function FlagshipHero() {

  const [ship, setShip] =
    useState<any>(null)

  useEffect(() => {

    fetch("/api/flagship")
      .then((res) => res.json())
      .then(setShip)

  }, [])

  if (!ship) {
    return null
  }

  return (

    <section
      className="
      relative
      overflow-hidden
      min-h-[650px]
      flex
      items-center"
    >

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950"
      />

      <div
        className="
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-2
        items-center
        gap-12
        px-8
        py-24
        relative
        z-10"
      >

        <div>

          <div
            className="
            text-eve-accent
            uppercase
            tracking-wider
            mb-4"
          >
            Featured Flagship
          </div>

          <h1
            className="
            text-6xl
            font-black
            mb-4"
          >
            {ship.name}
          </h1>

          <p
            className="
            text-2xl
            text-slate-300
            mb-6"
          >
            {ship.faction}
          </p>

          <p
            className="
            text-slate-400
            mb-8
            max-w-xl"
          >
            {ship.description}
          </p>

          <div
            className="
            text-3xl
            font-bold
            text-green-400
            mb-8"
          >
            {ship.price.toLocaleString()}
            {" "}
            ISK
          </div>

          <Link
            href={`/ships/${ship.slug}`}
            className="
            bg-eve-accent
            text-black
            px-6
            py-3
            rounded-lg
            font-bold"
          >
            View Hull
          </Link>

        </div>

        <div>

          <Image
            src={ship.image_url}
            alt={ship.name}
            width={1024}
            height={1024}
            priority
            className="
            w-full
            h-auto
            object-contain
            drop-shadow-2xl"
          />

        </div>

      </div>

    </section>

  )

}