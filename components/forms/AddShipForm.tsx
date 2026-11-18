"use client"

import { useState } from "react"

export default function AddShipForm() {

  const [success,setSuccess] =
    useState(false)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault()

    const form =
      new FormData(e.currentTarget)

    const response =
      await fetch(
        "/api/admin/ships",
        {
          method:"POST",

          headers:{
            "Content-Type":
            "application/json"
          },

          body:JSON.stringify({

            name:
            form.get("name"),

            slug:
            form.get("slug"),

            category:
            form.get("category"),

            stock:
            Number(
              form.get("stock")
            ),

            price:
            Number(
              form.get("price")
            )

          })
        }
      )

    if(response.ok){

      setSuccess(true)

    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <input
        name="name"
        placeholder="Ship Name"
        required
        className="
        w-full
        p-3
        bg-slate-900
        rounded"
      />

      <input
        name="slug"
        placeholder="raven"
        required
        className="
        w-full
        p-3
        bg-slate-900
        rounded"
      />

      <input
        name="category"
        placeholder="Battleship"
        required
        className="
        w-full
        p-3
        bg-slate-900
        rounded"
      />

      <input
        name="stock"
        type="number"
        required
        className="
        w-full
        p-3
        bg-slate-900
        rounded"
      />

      <input
        name="price"
        type="number"
        required
        className="
        w-full
        p-3
        bg-slate-900
        rounded"
      />

      <button
        className="
        bg-yellow-500
        text-black
        px-4
        py-2
        rounded"
      >
        Save Ship
      </button>

      {success && (

        <p className="text-green-500">

          Ship Created

        </p>

      )}

    </form>

  )
}