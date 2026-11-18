"use client"

import { useState } from "react"
import { createClient }
from "@/lib/supabase/client"

export default function LoginPage() {

  const [email,setEmail] =
    useState("")

  const [password,setPassword] =
    useState("")

  async function login() {

    const supabase =
      createClient()

    const { error } =
      await supabase.auth
        .signInWithPassword({
          email,
          password
        })

    if(error){

      alert(error.message)

      return

    }

    window.location.href =
      "/admin"

  }

  return (

    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center"
    >

      <div
        className="
        w-full
        max-w-md
        p-6
        bg-slate-900
        rounded-xl"
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-6"
        >
          Bears Inc Login
        </h1>

        <input
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="
          w-full
          p-3
          mb-4
          bg-slate-800
          rounded"
        />

        <input
          type="password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
          placeholder="Password"
          className="
          w-full
          p-3
          mb-4
          bg-slate-800
          rounded"
        />

        <button
          onClick={login}
          className="
          w-full
          bg-yellow-500
          text-black
          p-3
          rounded"
        >
          Login
        </button>

      </div>

    </main>

  )
}