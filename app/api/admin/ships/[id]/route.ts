import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function PATCH(
  request: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {

  const body = await request.json()

  const { id } = await params

  const { error } = await supabase
    .from("ships")
    .update(body)
    .eq("id", id)

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