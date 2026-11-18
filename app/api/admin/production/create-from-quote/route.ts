import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function POST(
  request: Request
) {

  const { quote_id } =
    await request.json()

  const {
    data: quote,
    error: quoteError
  } = await supabase
    .from("fleet_quotes")
    .select("*")
    .eq("id", quote_id)
    .single()

  if (
    quoteError ||
    !quote
  ) {

    return NextResponse.json(
      {
        error:
          "Quote not found"
      },
      {
        status: 404
      }
    )

  }

  const {
    data: existing
  } = await supabase
    .from("production_jobs")
    .select("id")
    .eq("quote_id", quote.id)
    .maybeSingle()

  if (existing) {

    return NextResponse.json({
      success: true,
      message:
        "Production job already exists"
    })

  }

  const { error } =
    await supabase
      .from("production_jobs")
      .insert({

        quote_id:
          quote.id,

        ship_type:
          quote.ship_type,

        quantity:
          quote.quantity,

        progress: 0,

        status:
          "Pending"

      })

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
    success: true,
    message:
      "Production job created"
  })

}