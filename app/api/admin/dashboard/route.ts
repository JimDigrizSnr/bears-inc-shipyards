// app/api/admin/dashboard/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function GET() {

  const [
    shipsResult,
    quotesResult,
    jobsResult
  ] = await Promise.all([

    supabase
      .from("ships")
      .select("*"),

    supabase
      .from("fleet_quotes")
      .select("*"),

    supabase
      .from("production_jobs")
      .select("*")

  ])

  const ships =
    shipsResult.data ?? []

  const quotes =
    quotesResult.data ?? []

  const jobs =
    jobsResult.data ?? []

  const activeShips =
    ships.filter(
      ship => ship.active
    ).length

  const inventoryItems =
    ships.filter(
      ship => ship.active
    ).length

  const totalStock =
    ships.reduce(
      (sum, ship) =>
        sum + (ship.stock ?? 0),
      0
    )

  const inventoryValue =
    ships.reduce(
      (sum, ship) =>
        sum +
        (
          (ship.stock ?? 0) *
          (ship.price ?? 0)
        ),
      0
    )

  const openQuotes =
    quotes.filter(
      quote =>
        quote.status !==
        "Delivered"
    ).length

  const deliveredQuotes =
    quotes.filter(
      quote =>
        quote.status ===
        "Delivered"
    ).length

  const pendingJobs =
    jobs.filter(
      job =>
        job.status !==
        "Completed"
    ).length

  const completedJobs =
    jobs.filter(
      job =>
        job.status ===
        "Completed"
    ).length

  const recentQuotes =
    [...quotes]
      .sort(
        (a, b) =>
          new Date(
            b.created_at
          ).getTime()
          -
          new Date(
            a.created_at
          ).getTime()
      )
      .slice(0, 5)

  const recentJobs =
    [...jobs]
      .sort(
        (a, b) =>
          new Date(
            b.created_at
          ).getTime()
          -
          new Date(
            a.created_at
          ).getTime()
      )
      .slice(0, 5)

  const lowStockShips =
    ships
      .filter(
        ship =>
          ship.active &&
          (ship.stock ?? 0) < 5
      )
      .sort(
        (a, b) =>
          (a.stock ?? 0) -
          (b.stock ?? 0)
      )
      .slice(0, 10)

  const bottlenecks =
    jobs
      .filter(
        job =>
          job.status !==
            "Completed"
          &&
          (job.progress ?? 0) < 25
      )
      .slice(0, 10)

  const activityFeed = [

    ...quotes.map(
      quote => ({

        type: "Quote",

        id: quote.id,

        title:
          `${quote.ship_type} Quote`,

        status:
          quote.status,

        created_at:
          quote.created_at

      })
    ),

    ...jobs.map(
      job => ({

        type:
          "Production",

        id:
          job.id,

        title:
          job.ship_type,

        status:
          job.status,

        created_at:
          job.created_at

      })
    )

  ]
    .sort(
      (a, b) =>
        new Date(
          b.created_at
        ).getTime()
        -
        new Date(
          a.created_at
        ).getTime()
    )
    .slice(0, 10)

  return NextResponse.json({

    activeShips,

    inventoryItems,

    totalStock,

    inventoryValue,

    openQuotes,

    deliveredQuotes,

    pendingJobs,

    completedJobs,

    recentQuotes,

    recentJobs,

    lowStockShips,

    bottlenecks,

    activityFeed

  })

}
