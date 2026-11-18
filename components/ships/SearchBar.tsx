"use client"

import { useState } from "react"

export default function SearchBar(){

  const [query,setQuery] =
    useState("")

  return (

    <input

      value={query}

      onChange={(e)=>
        setQuery(
          e.target.value
        )
      }

      placeholder="Search ships..."

      className="
      w-full
      bg-slate-900
      rounded-xl
      p-4"

    />

  )
}