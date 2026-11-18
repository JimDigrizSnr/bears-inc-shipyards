import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function GET() {

  const { data: jobs } =
    await supabase
      .from("production_jobs")
      .select("*")

  const pending =
    jobs?.filter(
      job =>
        job.status === "Pending"
    ).length ?? 0

  const inProgress =
    jobs?.filter(
      job =>
        job.status === "In Progress"
    ).length ?? 0

  const completed =
    jobs?.filter(
      job =>
        job.status === "Completed"
    ).length ?? 0

  return NextResponse.json({

    pending,

    inProgress,

    completed,

    total:
      jobs?.length ?? 0

  })

}