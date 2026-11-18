import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function POST(
  request: Request,
  {
    params
  }: {
    params: Promise<{
      id: string
    }>
  }
) {

  const { id } = await params

  const { data: quote } =
    await supabase
      .from("fleet_quotes")
      .select("*")
      .eq("id", Number(id))
      .single()

  if (!quote) {

    return Response.json(
      {
        error: "Quote not found"
      },
      {
        status: 404
      }
    )

  }

  const { error } =
    await supabase
      .from("production_jobs")
      .insert({

        quote_id: quote.id,

        ship_type:
          quote.ship_type,

        quantity:
          quote.quantity,

        progress: 0,

        status: "active"

      })

await supabase
  .from("quote_history")
  .insert({
    quote_id: quote.id,
    event: "Production job created"
  })

  if (error) {

    return Response.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    )

  }

  return Response.json({
    success: true
  })

}