"use client"

export const dynamic =
  "force-dynamic"

import {
  useEffect,
  useState
} from "react"

import {
  useSearchParams
} from "next/navigation"

export default function QuoteRequestForm() {

  const searchParams =
    useSearchParams()

  const [customer,
    setCustomer] =
    useState<any>(null)

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

      if (
        response.ok
      ) {

        const data =
          await response.json()

        setCustomer(
          data
        )

      }

    }

    loadCustomer()

    const ship =
      searchParams.get(
        "ship"
      )

    if (ship) {

      setShipType(
        ship
      )

    }

  }, [searchParams])

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
        max-w-3xl
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
        Request Quote
      </h1>

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

        <input
          placeholder="Ship"
          value={shipType}
          onChange={(e) =>
            setShipType(
              e.target.value
            )
          }
          className="
          w-full
          p-4
          rounded-xl
          bg-slate-900"
        />

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