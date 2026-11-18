"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function NewQuotePage() {

  const router =
    useRouter()

  const [ships, setShips] =
    useState<any[]>([])

  const [corporation,
    setCorporation] =
    useState("")

  const [characterName,
    setCharacterName] =
    useState("")

  const [shipId,
    setShipId] =
    useState("")

  const [quantity,
    setQuantity] =
    useState(1)

  const [notes,
    setNotes] =
    useState("")

const selectedShip =
  ships.find(
    (ship) =>
      ship.id ===
      Number(shipId)
  )

const unitPrice =
  selectedShip?.price ?? 0

const totalPrice =
  unitPrice * quantity

  useEffect(() => {

    fetch(
      "/api/admin/catalogue"
    )
      .then(
        (res) =>
          res.json()
      )
      .then(
        setShips
      )

  }, [])

  async function createQuote() {

    const response =
      await fetch(
        "/api/admin/quotes/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            corporation,

            character_name:
              characterName,

            ship_id:
              Number(shipId),

            quantity,

            notes

          })

        }
      )

    if (
      response.ok
    ) {

      router.push(
        "/admin/quotes"
      )

    }

  }

  return (

    <main
      className="
      max-w-3xl
      mx-auto
      p-8"
    >

      <h1
        className="
        text-4xl
        font-bold
        mb-8"
      >
        Create Quote
      </h1>

      <div
        className="
        space-y-4"
      >

        <input
          placeholder="Corporation"
          value={corporation}
          onChange={(e) =>
            setCorporation(
              e.target.value
            )
          }
          className="
          w-full
          p-3
          rounded
          bg-slate-900"
        />

        <input
          placeholder="Character Name"
          value={characterName}
          onChange={(e) =>
            setCharacterName(
              e.target.value
            )
          }
          className="
          w-full
          p-3
          rounded
          bg-slate-900"
        />

        <select
          value={shipId}
          onChange={(e) =>
            setShipId(
              e.target.value
            )
          }
          className="
          w-full
          p-3
          rounded
          bg-slate-900"
        >

          <option value="">
            Select Ship
          </option>

          {ships.map(
            (ship) => (

<option
  key={ship.id}
  value={ship.id}
>
  {ship.name}
  {" · "}
  {ship.price?.toLocaleString()}
  ISK
</option>

            )
          )}

        </select>

<div
  className="
  bg-slate-900
  border
  border-slate-700
  rounded
  p-4"
>

  <div
    className="
    flex
    justify-between"
  >

    <span>
      Unit Price
    </span>

    <span>
      {unitPrice.toLocaleString()}
      {" "}
      ISK
    </span>

  </div>

  <div
    className="
    flex
    justify-between
    mt-2
    font-bold
    text-eve-accent"
  >

    <span>
      Total
    </span>

    <span>
      {totalPrice.toLocaleString()}
      {" "}
      ISK
    </span>

  </div>

</div>

        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Number(
                e.target.value
              )
            )
          }
          className="
          w-full
          p-3
          rounded
          bg-slate-900"
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          className="
          w-full
          h-40
          p-3
          rounded
          bg-slate-900"
        />

        <button
          onClick={
            createQuote
          }
          className="
          bg-eve-accent
          text-black
          px-6
          py-3
          rounded"
        >
          Create Quote
        </button>

      </div>

    </main>

  )

}