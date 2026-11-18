"use client"

export default function ProductionActions({
  id,
  progress
}: {
  id: number
  progress: number
}) {

  async function updateProgress(
    newProgress: number
  ) {

    await fetch(
      `/api/admin/production/${id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          progress: newProgress
        })
      }
    )

    window.location.reload()
  }

async function completeJob() {

  const response = await fetch(
    `/api/admin/production/${id}/complete`,
    {
      method: "POST"
    }
  )

  if (!response.ok) {
    alert("Failed to complete job")
    return
  }

  window.location.reload()
}



  return (

    <div className="flex gap-2">

      <button
        onClick={() =>
          updateProgress(
            Math.min(100, progress + 10)
          )
        }
        className="
        bg-green-600
        text-white
        px-2
        py-1
        rounded"
      >
        +10%
      </button>

      <button
        onClick={() =>
          updateProgress(
            Math.max(0, progress - 10)
          )
        }
        className="
        bg-red-600
        text-white
        px-2
        py-1
        rounded"
      >
        -10%
      </button>

<button
  onClick={completeJob}
  className="
  bg-blue-600
  text-white
  px-2
  py-1
  rounded"
>
  Complete
</button>

    </div>

  )
}