"use client"

import {
  useEffect,
  useState
} from "react"

import {
  useParams
} from "next/navigation"

export default function ProductionJobPage() {

  const params =
    useParams()

  const id =
    params.id as string

  const [job,
    setJob] =
    useState<any>(null)

  useEffect(() => {

    async function loadJob() {

      const response =
        await fetch(
          `/api/admin/production/${id}`
        )

      const data =
        await response.json()

      setJob(data)

    }

    if (id) {

      loadJob()

    }

  }, [id])

  async function saveJob(
    updated: any
  ) {

    await fetch(
      "/api/admin/production/update",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify({

            id:
              updated.id,

            progress:
              updated.progress,

            status:
              updated.status,

            estimated_completion_date:
              updated.estimated_completion_date

          })

      }
    )

    setJob(updated)

  }

  async function completeJob() {

    await fetch(
      "/api/admin/production/complete",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify({

            job_id:
              job.id

          })

      }
    )

    setJob({

      ...job,

      progress: 100,

      status: "Completed",

      estimated_completion_date:
        new Date()
          .toISOString()
          .split("T")[0]

    })

  }

  if (!job) {

    return (

      <main
        className="
        max-w-4xl
        mx-auto
        p-8"
      >

        Loading Job...

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
        Production Job #{job.id}
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
            Ship:
          </strong>

          {" "}

          {job.ship_type}

        </div>

        <div>

          <strong>
            Quantity:
          </strong>

          {" "}

          {job.quantity}

        </div>

        <div>

          <strong>
            Quote:
          </strong>

          {" "}

          #{job.quote_id}

        </div>

        <div>

          <strong>
            Progress:
          </strong>

        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={job.progress}
          onChange={(e) =>

            saveJob({

              ...job,

              progress:
                Number(
                  e.target.value
                )

            })

          }
          className="
          w-full"
        />

        <div>

          {job.progress}%

        </div>

        <div>

          <strong>
            Estimated Completion:
          </strong>

        </div>

        <input
          type="date"
          value={
            job.estimated_completion_date
              ? job.estimated_completion_date
                  .split("T")[0]
              : ""
          }
          onChange={(e) =>

            saveJob({

              ...job,

              estimated_completion_date:
                e.target.value

            })

          }
          className="
          p-3
          rounded
          bg-slate-800
          w-full"
        />

        <div>

          <strong>
            Status:
          </strong>

        </div>

        <select
          value={job.status}
          onChange={(e) =>

            saveJob({

              ...job,

              status:
                e.target.value

            })

          }
          className="
          p-3
          rounded
          bg-slate-800"
        >

          <option>
            Pending
          </option>

          <option>
            In Progress
          </option>

          <option>
            Completed
          </option>

        </select>

        {job.status !==
          "Completed" && (

          <button
            onClick={
              completeJob
            }
            className="
            bg-green-600
            hover:bg-green-500
            px-4
            py-2
            rounded"
          >

            Complete Job

          </button>

        )}

      </div>

    </main>

  )

}