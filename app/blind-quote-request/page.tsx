"use client"

import {
  useEffect,
  useMemo,
  useState
} from "react"

export default function BlindQuoteRequestPage() {

  const [customer,
    setCustomer] =
    useState<any>(null)

  const [ships,
    setShips] =
    useState<any[]>([])

  const [selectedHullClass,
    setSelectedHullClass] =
    useState("")

  const [shipType,
    setShipType] =
    useState("")

  const [quantity,
    setQuantity] =
    useState(1)

  const [slackContact,
    setSlackContact] =
    useState("")

  const [notes,
    setNotes] =
    useState("")

  const [submitted,
    setSubmitted] =
    useState(false)

  useEffect(() => {

    async function loadCustomer() {

      const response =
        await fetch(
          "/api/customer"
        )

      if (response.ok) {

        const data =
          await response.json()

        setCustomer(
          data
        )

      }

    }

    async function loadShips() {

      const response =
        await fetch(
          "/api/eve-ships"
        )

      if (response.ok) {

        const data =
          await response.json()

        setShips(
          data
        )

      }

    }

    loadCustomer()
    loadShips()

  }, [])

  const hullClasses =
    useMemo(
      () =>

        [...new Set(

          ships.map(
            ship =>
              ship.hull_class
          )

        )]
          .filter(Boolean)
          .sort(),

      [ships]
    )

  const filteredShips =
    selectedHullClass
      ? ships.filter(
          ship =>
            ship.hull_class ===
            selectedHullClass
        )
      : []

  async function submitQuote() {

    const response =
      await fetch(
        "/api/quote-request",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({

              ship_type:
                shipType,

              quantity,

              slack_contact:
                slackContact,

              notes

            })

        }
      )

    if (
      response.ok
    ) {

      setSubmitted(
        true
      )

    }

  }

  if (submitted) {

    return (

      <main
        className="
        max-w-4xl
        mx-auto
        p-8"
      >

        <h1
          className="
          text-4xl
          font-bold
          mb-4"
        >
          Quote Request Submitted
        </h1>

        <p>
          Bears Inc Shipyards
          has received your
          request.
        </p>

      </main>

    )

  }

  return (

    <main
      className="
      max-w-4xl
      mx-auto
      p-8"
    >

      <h1
        className="
        text-4xl
        font-bold
        mb-2"
      >
        Request a Quote
      </h1>

      <p
        className="
        text-slate-400
        mb-8"
      >
        Request any buildable hull
        from across New Eden.
      </p>

      {customer && (

        <div
          className="
          mb-8
          rounded-xl
          border
          border-slate-800
          bg-eve-surface
          p-6"
        >

          <p>
            <strong>Pilot:</strong>
            {" "}
            {customer.character_name}
          </p>

          <p>
            <strong>Corporation:</strong>
            {" "}
            {customer.corporation_name}
          </p>

          <p>
            <strong>Alliance:</strong>
            {" "}
            {customer.alliance_name}
          </p>

        </div>

      )}

      <div
        className="
        space-y-4"
      >

        <select
          value={
            selectedHullClass
          }
          onChange={(e) => {

            setSelectedHullClass(
              e.target.value
            )

            setShipType("")
          }}
          className="
          w-full
          p-4
          rounded-xl
          bg-slate-900"
        >

          <option value="">
            Select Hull Class
          </option>

          {hullClasses.map(
            hullClass => (

              <option
                key={hullClass}
                value={hullClass}
              >
                {hullClass}
              </option>

            )
          )}

        </select>

        <select
          value={shipType}
          onChange={(e) =>
            setShipType(
              e.target.value
            )
          }
          disabled={
            !selectedHullClass
          }
          className="
          w-full
          p-4
          rounded-xl
          bg-slate-900"
        >

          <option value="">
            Select Ship
          </option>

          {filteredShips.map(
            ship => (

              <option
                key={ship.id}
                value={ship.name}
              >
                {ship.name}
              </option>

            )
          )}

        </select>

        <input
          type="number"
          min="1"
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
          p-4
          rounded-xl
          bg-slate-900"
        />

        <input
          placeholder="Slack Username"
          value={slackContact}
          onChange={(e) =>
            setSlackContact(
              e.target.value
            )
          }
          className="
          w-full
          p-4
          rounded-xl
          bg-slate-900"
        />

        <textarea
          placeholder="Additional requirements"
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          className="
          w-full
          h-40
          p-4
          rounded-xl
          bg-slate-900"
        />

        <button
          onClick={
            submitQuote
          }
          disabled={!shipType}
          className="
          bg-amber-400
          text-black
          px-6
          py-3
          rounded-xl
          font-bold"
        >
          Submit Quote Request
        </button>

      </div>

    </main>

  )

}