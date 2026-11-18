"use client"

import {
  useEffect,
  useState
} from "react"

export default function ProductionPage() {

  const [jobs,
    setJobs] =
    useState<any[]>([])

  const [loading,
    setLoading] =
    useState(true)

  useEffect(() => {

    async function loadJobs() {

      const response =
        await fetch(
          "/api/my-production"
        )

      if (
        response.ok
      ) {

        const data =
          await response.json()

        setJobs(
          data
        )

      }

      setLoading(
        false
      )

    }

    loadJobs()

  }, [])

  if (loading) {

    return (

      <main
        className="
        max-w-6xl
        mx-auto
        p-8"
      >

        Loading production jobs...

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

      <div
        className="
        mb-8"
      >

        <h1
          className="
          text-4xl
          font-bold
          mb-3"
        >
          Production Jobs
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
            📢 Check back here regularly for
            production updates, build progress
            and delivery notifications from
            Bears Inc Shipyards.
          </p>

        </div>

      </div>

      {jobs.length === 0 && (

        <div
          className="
          bg-eve-surface
          border
          border-slate-800
          rounded-xl
          p-6"
        >

          No active production jobs.

        </div>

      )}

      <div
        className="
        space-y-4"
      >

        {jobs.map(
          job => (

            <div
              key={job.id}
              className="
              bg-eve-surface
              border
              border-slate-800
              rounded-xl
              p-6"
            >

              <div
                className="
                flex
                justify-between
                items-start
                mb-4"
              >

                <div>

                  <h2
                    className="
                    text-2xl
                    font-bold"
                  >
                    {job.ship_type}
                  </h2>

                  <p
                    className="
                    text-slate-400"
                  >
                    Quantity:
                    {" "}
                    {job.quantity}
                  </p>

                </div>

                <div
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-slate-800"
                >

                  {job.status}

                </div>

              </div>

              <div
                className="
                mb-2"
              >

                Progress:
                {" "}
                {job.progress}%

              </div>

              <div
                className="
                w-full
                bg-slate-900
                rounded-full
                h-3
                mb-4"
              >

                <div
                  className="
                  bg-amber-400
                  h-3
                  rounded-full
                  transition-all"
                  style={{
                    width:
                      `${job.progress}%`
                  }}
                />

              </div>

              {job.estimated_completion_date && (

                <div
                  className="
                  text-slate-300"
                >

                  <strong>
                    Estimated Completion:
                  </strong>
                  {" "}
                  {new Date(
                    job.estimated_completion_date
                  ).toLocaleDateString(
                    "en-GB"
                  )}

                </div>

              )}

              <div
                className="
                mt-2
                text-sm
                text-slate-500"
              >

                Job Created:
                {" "}
                {new Date(
                  job.created_at
                ).toLocaleDateString(
                  "en-GB"
                )}

              </div>

            </div>

          )
        )}

      </div>

    </main>

  )

}