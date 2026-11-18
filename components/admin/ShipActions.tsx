"use client"

export default function ShipActions({
  id,
  stock
}:{
  id:number
  stock:number
}) {

async function updateStock(
  newStock: number
) {

  console.log(
    "Updating stock to:",
    newStock
  )

  const response =
    await fetch(
      `/api/admin/ships/${id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          stock: newStock
        })
      }
    )

  console.log(
    "Response:",
    response.status
  )

  location.reload()
}

  return (

    <div className="flex gap-2">

      <button
        onClick={() =>
          updateStock(stock + 1)
        }
        className="
        bg-green-600
        text-white
        px-2
        py-1
        rounded"
      >
        +1
      </button>

      <button
        onClick={() =>
          updateStock(
            Math.max(0, stock - 1)
          )
        }
        className="
        bg-red-600
        text-white
        px-2
        py-1
        rounded"
      >
        -1
      </button>

    </div>

  )
}