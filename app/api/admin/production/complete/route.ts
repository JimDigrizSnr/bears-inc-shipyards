import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function POST(
  request: Request
) {

  const { job_id } =
    await request.json()

  const { error } =
    await supabase.rpc(
      "complete_production_job",
      {
        p_job_id: job_id
      }
    )

  if (error) {

    console.error(
      "Complete job error:",
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
      "Production job completed successfully"
  })

}