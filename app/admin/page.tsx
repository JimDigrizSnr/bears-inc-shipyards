"use client"

import {
  useEffect,
  useState
} from "react"

export default function OperationsCentre() {

  const [stats,
    setStats] =
    useState<any>(null)

  useEffect(() => {

    fetch(
      "/api/admin/dashboard"
    )
      .then(
        (res) =>
          res.json()
      )
      .then(
        setStats
      )

  }, [])

  if (!stats) {

    return (

      <main
        className="
        max-w-7xl
        mx-auto
        p-8"
      >

        Loading Operations Centre...

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

      <h1
        className="
        text-5xl
        font-bold
        mb-8"
      >
        Operations Centre
      </h1>

      {/* KPI Cards */}

      <div
        className="
        grid
        md:grid-cols-3
        lg:grid-cols-6
        gap-4
        mb-10"
      >

        <div
          className="
          bg-slate-900
          rounded-xl
          p-4"
        >

          <div
            className="
            text-4xl
            font-bold"
          >
            {stats.activeShips}
          </div>

          <div>
            Active Catalogue Ships
          </div>

        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-4"
        >

          <div
            className="
            text-4xl
            font-bold
            text-yellow-400"
          >
            {stats.openQuotes}
          </div>

          <div>
            Open Quotes
          </div>

        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-4"
        >

          <div
            className="
            text-4xl
            font-bold
            text-green-400"
          >
            {stats.deliveredQuotes}
          </div>

          <div>
            Delivered Quotes
          </div>

        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-4"
        >

          <div
            className="
            text-4xl
            font-bold
            text-orange-400"
          >
            {stats.pendingJobs}
          </div>

          <div>
            Active Production
          </div>

        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-4"
        >

          <div
            className="
            text-4xl
            font-bold
            text-sky-400"
          >
            {stats.completedJobs}
          </div>

          <div>
            Completed Jobs
          </div>

        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-4"
        >

          <div
            className="
            text-xl
            font-bold
            text-eve-accent"
          >
            {stats.inventoryValue.toLocaleString()}
          </div>

          <div>
            Inventory Value
          </div>

        </div>

      </div>

      {/* Shipyard Statistics */}

<div
  className="
  grid
  md:grid-cols-4
  gap-4
  mb-10"
>

  <div
    className="
    bg-slate-900
    rounded-xl
    p-4"
  >
    <div
      className="
      text-3xl
      font-bold
      text-eve-accent"
    >
      {stats.totalShipDesigns}
    </div>

    <div>
      Ship Designs
    </div>
  </div>

  <div
    className="
    bg-slate-900
    rounded-xl
    p-4"
  >
    <div
      className="
      text-3xl
      font-bold
      text-green-400"
    >
      {stats.buildableShips}
    </div>

    <div>
      Buildable Hulls
    </div>
  </div>

  <div
    className="
    bg-slate-900
    rounded-xl
    p-4"
  >
    <div
      className="
      text-3xl
      font-bold
      text-red-400"
    >
      {stats.capitalShips}
    </div>

    <div>
      Capital Hulls
    </div>
  </div>

  <div
    className="
    bg-slate-900
    rounded-xl
    p-4"
  >
    <div
      className="
      text-3xl
      font-bold
      text-blue-400"
    >
      {stats.tech3Ships}
    </div>

    <div>
      Tech III Hulls
    </div>
  </div>

</div>

      {/* Inventory Summary */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-4
        mb-10"
      >

        <div
          className="
          bg-slate-900
          rounded-xl
          p-6"
        >

          <div
            className="
            text-3xl
            font-bold"
          >
            {stats.totalStock}
          </div>

          <div>
            Total Ships In Stock
          </div>

        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-6"
        >

          <div
            className="
            text-3xl
            font-bold"
          >
            {stats.inventoryItems}
          </div>

          <div>
            Inventory Items
          </div>

        </div>

      </div>

      {/* Recent Activity */}

      <div
        className="
        grid
        lg:grid-cols-2
        gap-8
        mb-10"
      >

        <div
          className="
          bg-slate-900
          rounded-xl
          p-6"
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-4"
          >
            Recent Quotes
          </h2>

          {stats.recentQuotes?.map(
            (quote: any) => (

              <a
                key={quote.id}
                href={
                  `/admin/quotes/${quote.id}`
                }
                className="
                block
                py-2
                border-b
                border-slate-800"
              >

                <div>
                  #{quote.id}
                  {" - "}
                  {quote.ship_type}
                </div>

                <div
                  className="
                  text-sm
                  text-slate-400"
                >
                  {quote.character_name}
                </div>

              </a>

            )
          )}

        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-6"
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-4"
          >
            Recent Production
          </h2>

          {stats.recentJobs?.map(
            (job: any) => (

              <a
                key={job.id}
                href={
                  `/admin/production/${job.id}`
                }
                className="
                block
                py-2
                border-b
                border-slate-800"
              >

                <div>
                  #{job.id}
                  {" - "}
                  {job.ship_type}
                </div>

                <div
                  className="
                  text-sm
                  text-slate-400"
                >
                  {job.progress}% complete
                </div>

              </a>

            )
          )}

        </div>

      </div>

      {/* Alerts & Activity */}

      <div
        className="
        grid
        lg:grid-cols-3
        gap-8"
      >

        <div
          className="
          bg-slate-900
          rounded-xl
          p-6"
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-4
            text-red-400"
          >
            Low Stock Alerts
          </h2>

          {stats.lowStockShips?.map(
            (ship: any) => (

              <div
                key={ship.id}
                className="
                py-2
                border-b
                border-slate-800"
              >

                {ship.name}
                {" - "}
                {ship.stock}

              </div>

            )
          )}

        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-6"
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-4
            text-yellow-400"
          >
            Production Bottlenecks
          </h2>

          {stats.bottlenecks?.map(
            (job: any) => (

              <div
                key={job.id}
                className="
                py-2
                border-b
                border-slate-800"
              >

                #{job.id}
                {" - "}
                {job.ship_type}
                {" - "}
                {job.progress}%

              </div>

            )
          )}

        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-6"
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-4"
          >
            Activity Feed
          </h2>

          {stats.activityFeed?.map(
            (
              item: any,
              index: number
            ) => (

              <div
                key={index}
                className="
                py-2
                border-b
                border-slate-800"
              >

                <strong>
                  {item.type}
                </strong>

                {" - "}

                {item.title}

                {" - "}

                {item.status}

              </div>

            )
          )}

        </div>

      </div>

    </main>

  )

}