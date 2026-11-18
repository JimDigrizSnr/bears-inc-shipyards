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
    params: Promise<{ id: string }>
  }
) {

  const { id } = await params

  // Find production job

  const { data: job, error: jobError } =
    await supabase
      .from("production_jobs")
      .select("*")
      .eq("id", Number(id))
      .single()

  if (jobError || !job) {

    return Response.json(
      {
        error: "Production job not found"
      },
      {
        status: 404
      }
    )
  }

  // Find ship

  const { data: ship, error: shipError } =
    await supabase
      .from("ships")
      .select("*")
      .eq("name", job.ship_type)
      .single()

  if (shipError || !ship) {

    return Response.json(
      {
        error: "Ship not found"
      },
      {
        status: 404
      }
    )
  }

  // Update stock

  const { error: stockError } =
    await supabase
      .from("ships")
      .update({
        stock: ship.stock + job.quantity
      })
      .eq("id", ship.id)

  if (stockError) {

    return Response.json(
      {
        error: stockError.message
      },
      {
        status: 500
      }
    )
  }

  // Mark job complete

  const { error: completeError } =
    await supabase
      .from("production_jobs")
      .update({
        status: "completed",
        progress: 100
      })
      .eq("id", job.id)

if (job.quote_id) {

  await supabase
    .from("fleet_quotes")
    .update({
      status: "ready"
    })
    .eq("id", job.quote_id)

await supabase
  .from("quote_history")
  .insert({
    quote_id: job.quote_id,
    event: "Production completed"
  })

}

  if (completeError) {

    return Response.json(
      {
        error: completeError.message
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