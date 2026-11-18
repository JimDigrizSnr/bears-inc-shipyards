"use client"

export default function QuoteStatusButton({
  id
}: {
  id: number
}) {

  async function updateStatus(
    status: string
  ) {

    await fetch(
      `/api/admin/quotes/${id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          status
        })
      }
    )

    window.location.reload()

  }

  return (

    <div className="flex gap-2 flex-wrap">

      <button
        onClick={() => updateStatus("quoted")}
        className="
        px-2
        py-1
        bg-blue-500
        text-white
        rounded"
      >
        Quote
      </button>

      <button
        onClick={() => updateStatus("building")}
        className="
        px-2
        py-1
        bg-yellow-500
        text-black
        rounded"
      >
        Build
      </button>

      <button
        onClick={() => updateStatus("ready")}
        className="
        px-2
        py-1
        bg-green-500
        text-white
        rounded"
      >
        Ready
      </button>

      <button
        onClick={() => updateStatus("delivered")}
        className="
        px-2
        py-1
        bg-purple-600
        text-white
        rounded"
      >
        Deliver
      </button>

    </div>

  )
}