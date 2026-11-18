"use client"

import {
  useEffect,
  useState
} from "react"

import {
  useParams
} from "next/navigation"

export default function QuotePage() {

  const params =
    useParams()

  const id =
    params.id as string

  const [quote,
    setQuote] =
    useState<any>(null)

  useEffect(() => {

    async function loadQuote() {

      const response =
        await fetch(
          `/api/admin/quotes/${id}`
        )

      const data =
        await response.json()

      setQuote(data)

    }

    if (id) {

      loadQuote()

    }

  }, [id])

  async function updateStatus(
    status: string
  ) {

    await fetch(
      "/api/admin/quotes/update-status",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          id: quote.id,

          status

        })

      }
    )

    setQuote({

      ...quote,

      status

    })

  }

  async function acceptQuote() {

    await updateStatus(
      "Accepted"
    )

    await fetch(
      "/api/admin/production/create-from-quote",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          quote_id:
            quote.id

        })

      }
    )

    alert(
      "Quote accepted and production job created."
    )

  }

  if (!quote) {

    return (

      <main
        className="
        max-w-4xl
        mx-auto
        p-8"
      >

        Loading Quote...

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
        mb-8"
      >
        Quote #{quote.id}
      </h1>

      <div
        className="
        bg-slate-900
        rounded-xl
        p-6
        space-y-4"
      >

        <div>

          <strong>
            Corporation:
          </strong>

          {" "}

          {quote.corporation}

        </div>

        <div>

          <strong>
            Character:
          </strong>

          {" "}

          {quote.character_name}

        </div>

        <div>

          <strong>
            Ship:
          </strong>

          {" "}

          {quote.ship_type}

        </div>

        <div>

          <strong>
            Quantity:
          </strong>

          {" "}

          {quote.quantity}

        </div>

        <div>

          <strong>
            Unit Price:
          </strong>

          {" "}

          {quote.unit_price?.toLocaleString()}
          {" "}
          ISK

        </div>

        <div>

          <strong>
            Total Price:
          </strong>

          {" "}

          {quote.total_price?.toLocaleString()}
          {" "}
          ISK

        </div>

        <div>

          <strong>
            Status:
          </strong>

        </div>

        <select
          value={quote.status}
          onChange={(e) =>
            updateStatus(
              e.target.value
            )
          }
          className="
          p-3
          rounded
          bg-slate-800
          border
          border-slate-700"
        >

          <option value="Draft">
            Draft
          </option>

          <option value="Sent">
            Sent
          </option>

          <option value="Accepted">
            Accepted
          </option>

          <option value="Rejected">
            Rejected
          </option>

          <option value="Delivered">
            Delivered
          </option>

        </select>

        {quote.status !==
          "Accepted" && (

          <button
            onClick={
              acceptQuote
            }
            className="
            block
            bg-green-600
            hover:bg-green-500
            px-4
            py-2
            rounded"
          >
            Accept Quote
          </button>

        )}

        <div>

          <strong>
            Notes:
          </strong>

          <div
            className="
            mt-2
            text-slate-300"
          >
            {quote.notes}
          </div>

        </div>

      </div>

    </main>

  )

}