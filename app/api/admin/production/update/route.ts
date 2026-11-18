import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase =
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  )

export async function POST(
  request: Request
) {

  const {

    id,

    progress,

    status,

    estimated_completion_date

  } = await request.json()

  const { error } =
    await supabase
      .from("production_jobs")
      .update({

        progress,

        status,

        estimated_completion_date

      })
      .eq(
        "id",
        id
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

  return NextResponse.json({

    success: true

  })

}