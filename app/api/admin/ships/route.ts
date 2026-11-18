import { createClient }
from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function POST(
  request: Request
) {

  const body =
    await request.json()

  const { error } =
    await supabase
      .from("ships")
      .insert({

        name: body.name,

        slug: body.slug,

        category: body.category,

        stock: body.stock,

        price: body.price

      })

  if(error){

    return Response.json(
      {
        error:error.message
      },
      {
        status:500
      }
    )
  }

  return Response.json({
    success:true
  })
}