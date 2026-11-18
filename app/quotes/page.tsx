// app/quotes/page.tsx

"use client"

import {
  useEffect,
  useState
} from "react"

export default function QuotesPage() {

  const [quotes,
    setQuotes] =
    useState<any[]>([])

  const [loading,
    setLoading] =
    useState(true)

  useEffect(() => {

    async function loadQuotes() {

      const response =
        await fetch(
          "/api/my-quotes"
        )

      if (response.ok) {

        const data =
          await response.json()

        setQuotes(
          data
        )

      }

      setLoading(
        false
      )

    }

    loadQuotes()

  }, [])

  if (loading) {

    return (

      <main
        className="
        max-w-6xl
        mx-auto
        p-8"
      >

        Loading quotes...

      </main>

    )

  }

  return (

    <main
      className="
      max-w-6xl
      mx-auto
      p-8"
    >

<div className="mb-8">

  <h1
    className="
    text-4xl
    font-bold
    mb-3"
  >
    My Quotes
  </h1>

  <div
    className="
    bg-eve-surface
    border
    border-slate-800
    rounded-xl
    p-4"
  >

    <p
      className="
      text-slate-300"
    >
📢 Check back here regularly for quotation updates, pricing information and responses from Bears Inc Shipyards.
    </p>

  </div>

</div>

      {quotes.length === 0 && (

        <div
          className="
          bg-eve-surface
          rounded-xl
          border
          border-slate-800
          p-6"
        >

          No quote requests found.

        </div>

      )}

      <div
        className="
        space-y-4"
      >

        {quotes.map(
          quote => (

            <div
              key={quote.id}
              className="
              bg-eve-surface
              rounded-xl
              border
              border-slate-800
              p-6"
            >

              <div
                className="
                flex
                justify-between
                items-start"
              >

                <div>

                  <h2
                    className="
                    text-2xl
                    font-bold"
                  >
                    {quote.ship_type}
                  </h2>

                  <p
                    className="
                    text-slate-400"
                  >
                    Quantity:
                    {" "}
                    {quote.quantity}
                  </p>

                </div>

                <div
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-slate-800"
                >

                  {quote.status}

                </div>

              </div>

              {quote.notes && (

                <p
                  className="
                  mt-4
                  text-slate-400"
                >
                  {quote.notes}
                </p>

              )}

            </div>

          )
        )}

      </div>

    </main>

  )

}