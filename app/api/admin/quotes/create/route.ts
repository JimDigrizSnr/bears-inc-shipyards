import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function POST(
  request: Request
) {

  const {
    corporation,
    character_name,
    ship_id,
    quantity,
    notes
  } = await request.json()

  const {
    data: ship,
    error: shipError
  } = await supabase
    .from("ships")
    .select("*")
    .eq("id", ship_id)
    .single()

  if (
    shipError ||
    !ship
  ) {

    return NextResponse.json(
      {
        error:
          "Ship not found"
      },
      {
        status: 404
      }
    )

  }

  const unitPrice =
    ship.price ?? 0

  const totalPrice =
    unitPrice * quantity

  const { error } =
    await supabase
      .from("fleet_quotes")
      .insert({

        corporation,

        character_name,

        ship_type:
          ship.name,

        ship_id,

        quantity,

        notes,

        unit_price:
          unitPrice,

        total_price:
          totalPrice,

        status:
          "Draft"

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
    success: true
  })

}