"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"

export default function ShipPage() {

  const params =
    useParams()

  const slug =
    params.slug as string

  const [ship,
    setShip] =
    useState<any>(null)

  useEffect(() => {

    async function loadShip() {

      const response =
        await fetch(
          `/api/ships/${slug}`
        )

      const data =
        await response.json()

      setShip(data)

    }

    if (slug) {

      loadShip()

    }

  }, [slug])

  if (!ship) {

    return (

      <main
        className="
        max-w-7xl
        mx-auto
        p-8"
      >

        Loading Ship...

      </main>

    )

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

        <div>

          <Image
            src={
              ship.image_url
            }
            alt={
              ship.name
            }
            width={1024}
            height={1024}
            className="
            w-full
            rounded-xl
            bg-slate-900
            p-6"
          />

        </div>

        <div>

          <h1
            className="
            text-5xl
            font-bold
            mb-4"
          >
            {ship.name}
          </h1>

          <p
            className="
            text-slate-400
            mb-2"
          >
            {ship.faction}
          </p>

          <p
            className="
            text-slate-400
            mb-6"
          >
            {ship.hull_class}
          </p>

          <div
            className="
            bg-slate-900
            rounded-xl
            p-6
            mb-6"
          >

            <div
              className="
              text-green-400
              text-xl
              mb-3"
            >
              {ship.stock}
              {" "}
              Available
            </div>

            <div
              className="
              text-3xl
              font-bold
              text-amber-400"
            >
              {ship.price?.toLocaleString()}
              {" "}
              ISK
            </div>

          </div>

          <div
            className="
            prose
            prose-invert
            max-w-none"
          >

            <p>
              {ship.description}
            </p>

          </div>

          <div
            className="
            mt-8
            flex
            flex-wrap
            gap-4"
          >

<a
  href={
    `/quote-request?ship=${encodeURIComponent(
      ship.name
    )}`
  }
  className="
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

        </div>

      </div>

    </main>

  )

}