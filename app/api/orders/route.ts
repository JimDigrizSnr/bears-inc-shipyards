import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function POST(
  request: Request
) {
  const body = await request.json()

  const { error } = await supabase
    .from("fleet_quotes")
    .insert({
      corporation: body.corporation,
      character_name: body.character_name,
      ship_type: body.ship_type,
      quantity: body.quantity,
      notes: body.notes
    })

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return Response.json({
    success: true
  })
}
