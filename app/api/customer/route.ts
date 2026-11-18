// app/api/customer/route.ts

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
        error:
          "Unauthenticated"
      },
      {
        status: 401
      }
    )

  }

  const {
    data: customer,
    error
  } = await supabase
    .from("customers")
    .select(`
      character_name,
      corporation_name,
      alliance_name,
      eve_character_id,
      access_granted
    `)
    .eq(
      "eve_character_id",
      Number(characterId)
    )
    .single()

  if (
    error ||
    !customer
  ) {

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

  return NextResponse.json(
    customer
  )

}