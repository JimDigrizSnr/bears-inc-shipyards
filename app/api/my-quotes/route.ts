// app/api/my-quotes/route.ts

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function GET() {

  const cookieStore =
    await cookies()

  const characterId =
    cookieStore.get(
      "character_id"
    )?.value

  if (!characterId) {

    return NextResponse.json(
      {
        error: "Unauthenticated"
      },
      {
        status: 401
      }
    )

  }

  const {
    data: customer
  } = await supabase
    .from("customers")
    .select("character_name")
    .eq(
      "eve_character_id",
      Number(characterId)
    )
    .single()

  if (!customer) {

    return NextResponse.json(
      {
        error:
          "Customer not found"
      },
      {
        status: 404
      }
    )

  }

  const {
    data: quotes,
    error
  } = await supabase
    .from("fleet_quotes")
    .select("*")
    .eq(
      "character_name",
      customer.character_name
    )
    .order(
      "created_at",
      {
        ascending: false
      }
    )

  if (error) {

    return NextResponse.json(
      {
        error:
          error.message
      },
      {
        status: 500
      }
    )

  }

  return NextResponse.json(
    quotes ?? []
  )

}