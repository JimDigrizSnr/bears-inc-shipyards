"use client"

import { useEffect, useState } from "react"

export default function ProductionPage() {

  const [jobs, setJobs] =
    useState<any[]>([])

const [stats,
  setStats] =
  useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

fetch(
  "/api/admin/production/stats"
)
  .then(
    res => res.json()
  )
  .then(
    setStats
  )

    async function loadJobs() {

      const response =
        await fetch(
          "/api/admin/production"
        )

      const data =
        await response.json()

      setJobs(data)

      setLoading(false)

    }

    loadJobs()

  }, [])

  if (loading) {

    return (

      <main
        className="
        max-w-7xl
        mx-auto
        p-8"
      >

        Loading Production...

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
        text-4xl
        font-bold
        mb-8"
      >
        Production Jobs
      </h1>

{stats && (

  <div
    className="
    grid
    md:grid-cols-4
    gap-4
    mb-8"
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
        font-bold"
      >
        {stats.total}
      </div>

      <div>
        Total Jobs
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
        text-yellow-400"
      >
        {stats.pending}
      </div>

      <div>
        Pending
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
        text-sky-400"
      >
        {stats.inProgress}
      </div>

      <div>
        In Progress
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
        {stats.completed}
      </div>

      <div>
        Completed
      </div>

    </div>

  </div>

)}

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

              <th className="p-3 text-left">
                Job
              </th>

              <th className="p-3 text-left">
                Ship
              </th>

              <th className="p-3 text-left">
                Qty
              </th>

              <th className="p-3 text-left">
                Progress
              </th>

              <th className="p-3 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {jobs.map(
              (job) => (

                <tr
                  key={job.id}
                  className="
                  border-b
                  border-slate-800"
                >

<td className="p-3">

  <a
    href={`/admin/production/${job.id}`}
    className="
    text-eve-accent"
  >
    #{job.id}
  </a>

</td>

                  <td className="p-3">
                    {job.ship_type}
                  </td>

                  <td className="p-3">
                    {job.quantity}
                  </td>

                  <td className="p-3">
<div
  className="
  w-full
  bg-slate-800
  rounded-full
  h-3"
>

  <div
    className="
    bg-green-500
    h-3
    rounded-full"
    style={{
      width:
        `${job.progress}%`
    }}
  />

</div>

<div className="mt-1">
  {job.progress}%
</div>

                  </td>

                  <td className="p-3">
                    {job.status}
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