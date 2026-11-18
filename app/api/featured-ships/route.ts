import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function GET() {

  const { data, error } =
    await supabase
      .from("ships")
      .select("*")
      .eq("featured", true)
      .eq("active", true)
      .order("name")
      .limit(4)

  if (error) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    )

  }

  return NextResponse.json(
    data ?? []
  )

}