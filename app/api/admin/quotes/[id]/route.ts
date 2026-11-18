import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {

  const { id } =
    await context.params

  const { data, error } =
    await supabase
      .from("fleet_quotes")
      .select("*")
      .eq("id", id)
      .single()

  if (error) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 404
      }
    )

  }

  return NextResponse.json(
    data
  )

}