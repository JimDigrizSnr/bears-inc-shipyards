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
    type_id
  } = await request.json()

  const {
    data: eveShip,
    error: fetchError
  } = await supabase
    .from("eve_ships")
    .select("*")
    .eq("type_id", type_id)
    .single()

  if (
    fetchError ||
    !eveShip
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

  const {
    data: existing
  } = await supabase
    .from("ships")
    .select("id, active")
    .eq(
      "type_id",
      eveShip.type_id
    )
    .maybeSingle()

  if (existing) {

    if (!existing.active) {

      const {
        error: restoreError
      } = await supabase
        .from("ships")
        .update({
          active: true
        })
        .eq(
          "id",
          existing.id
        )

      if (restoreError) {

        return NextResponse.json(
          {
            error:
              restoreError.message
          },
          {
            status: 500
          }
        )

      }

      return NextResponse.json({
        success: true,
        message:
          "Ship restored to catalogue"
      })

    }

    return NextResponse.json({
      success: true,
      message:
        "Already in catalogue"
    })

  }

  const slug =
    eveShip.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

  const { error } =
    await supabase
      .from("ships")
      .insert({

        type_id:
          eveShip.type_id,

        name:
          eveShip.name,

        slug,

        description:
          eveShip.description,

        image_url:
          eveShip.image_url,

        faction:
          eveShip.faction,

        faction_logo:
          eveShip.faction_logo,

        hull_class:
          eveShip.hull_class,

        tech_level:
          eveShip.tech_level,

        role:
          eveShip.role,

        category:
          eveShip.hull_class,

        stock: 0,

        price: 0,

        featured: false,

        active: true

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