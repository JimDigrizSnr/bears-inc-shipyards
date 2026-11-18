"use client"

import { useState } from "react"

export default function FleetOrderForm() {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setLoading(true)

    try {
      const form = new FormData(e.currentTarget)

      const response = await fetch(
        "/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            corporation: form.get("corporation"),
            character_name: form.get("character_name"),
            ship_type: form.get("ship_type"),
            quantity: Number(form.get("quantity")),
            notes: form.get("notes"),
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Request failed")
      }

      setSuccess(true)
    } catch (error) {
      console.error(error)
      alert("Failed to submit request")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        name="corporation"
        placeholder="Corporation"
        required
        className="w-full p-3 bg-slate-900 rounded"
      />

      <input
        name="character_name"
        placeholder="Character Name"
        required
        className="w-full p-3 bg-slate-900 rounded"
      />

      <input
        name="ship_type"
        placeholder="Ship Type"
        required
        className="w-full p-3 bg-slate-900 rounded"
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        required
        className="w-full p-3 bg-slate-900 rounded"
      />

      <textarea
        name="notes"
        rows={5}
        placeholder="Additional Notes"
        className="w-full p-3 bg-slate-900 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="
          px-6
          py-3
          bg-yellow-500
          text-black
          rounded
          font-semibold
        "
      >
        {loading ? "Submitting..." : "Submit Request"}
      </button>

      {success && (
        <p className="text-green-400">
          Fleet request submitted successfully.
        </p>
      )}
    </form>
  )
}