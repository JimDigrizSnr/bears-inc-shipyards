import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function POST(
  request: Request
) {

  const { id } =
    await request.json()

  const { error } =
    await supabase
      .from("ships")
      .update({
        active: false
      })
      .eq("id", id)

 if (error) {

  console.error(
    "Remove error:",
    error
  )

  return NextResponse.json(
    {
      error: error.message
    },
    {
      status: 500
    }
  )

}

  return NextResponse.json({

    success: true,

    message:
      "Removed from catalogue"

  })

}