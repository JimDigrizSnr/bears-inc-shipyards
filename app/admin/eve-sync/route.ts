import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function POST() {

  const { data: eveShips, error } =
    await supabase
      .from("eve_ships")
      .select("*")

  if (error) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )

  }

  let imported = 0

  for (const ship of eveShips ?? []) {

    const slug =
      ship.name
        .toLowerCase()
        .replaceAll(" ", "-")

    await supabase
      .from("ships")
      .upsert({
        name: ship.name,
        slug,
        description: ship.description,
        image_url: ship.image_url,
        faction: ship.faction,
        hull_class: ship.hull_class,
        tech_level: ship.tech_level,
        role: ship.role,

        price: 0,
        stock: 0
      })

    imported++

  }

  return NextResponse.json({
    imported
  })

}