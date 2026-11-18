"use client"

import { useEffect, useState } from "react"

export default function QuotesPage() {

  const [quotes, setQuotes] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    async function loadQuotes() {

      const response =
        await fetch(
          "/api/admin/quotes"
        )

      const data =
        await response.json()

      setQuotes(data)

      setLoading(false)

    }

    loadQuotes()

  }, [])

  if (loading) {

    return (

      <main
        className="
        max-w-7xl
        mx-auto
        p-8"
      >

        Loading Quotes...

      </main>

    )

  }

  return (

    <main
      className="
      max-w-7xl
      mx-auto
      p-8"
    >

      <div
        className="
        flex
        justify-between
        items-center
        mb-8"
      >

        <h1
          className="
          text-4xl
          font-bold"
        >
          Fleet Quotes
        </h1>

        <a
          href="/admin/quotes/new"
          className="
          bg-eve-accent
          text-black
          px-4
          py-2
          rounded"
        >
          New Quote
        </a>

      </div>

      <div
        className="
        overflow-x-auto"
      >

        <table
          className="
          w-full"
        >

          <thead>

            <tr
              className="
              border-b
              border-slate-700"
            >

              <th className="text-left p-3">
                ID
              </th>

              <th className="text-left p-3">
                Corporation
              </th>

              <th className="text-left p-3">
                Pilot
              </th>

              <th className="text-left p-3">
                Ship
              </th>

              <th className="text-left p-3">
                Qty
              </th>

              <th className="text-left p-3">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {quotes.map(
              (quote) => (

                <tr
                  key={quote.id}
                  className="
                  border-b
                  border-slate-800"
                >

<td className="p-3">

  <a
    href={
      `/admin/quotes/${quote.id}`
    }
    className="
    text-eve-accent"
  >
    #{quote.id}
  </a>

</td>

                  <td className="p-3">
                    {quote.corporation}
                  </td>

                  <td className="p-3">
                    {quote.character_name}
                  </td>

                  <td className="p-3">
                    {quote.ship_type}
                  </td>

                  <td className="p-3">
                    {quote.quantity}
                  </td>

                  <td className="p-3">
                    {quote.status}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </main>

  )

}