// app/api/my-production/route.ts

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
    data: quotes
  } = await supabase
    .from("fleet_quotes")
    .select("id")
    .eq(
      "character_name",
      customer.character_name
    )

  const quoteIds =
    quotes?.map(
      q => q.id
    ) ?? []

  if (
    quoteIds.length === 0
  ) {

    return NextResponse.json(
      []
    )

  }

  const {
    data: jobs,
    error
  } = await supabase
    .from("production_jobs")
    .select("*")
    .in(
      "quote_id",
      quoteIds
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
    jobs ?? []
  )

}