import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function POST(
  request: Request
) {

  const {
    ship_type,
    quantity,
    notes,
    slack_contact
  } = await request.json()

  //
  // Authentication
  //

  const cookieStore =
    await cookies()

  const characterId =
    cookieStore.get(
      "character_id"
    )?.value

  if (!characterId) {

    return NextResponse.json(
      {
        error:
          "Unauthenticated"
      },
      {
        status: 401
      }
    )

  }

  //
  // Customer Lookup
  //

  const {
    data: customer,
    error: customerError
  } = await supabase
    .from("customers")
    .select("*")
    .eq(
      "eve_character_id",
      Number(
        characterId
      )
    )
    .single()

  if (
    customerError ||
    !customer
  ) {

    return NextResponse.json(
      {
        error:
          "Customer record not found"
      },
      {
        status: 404
      }
    )

  }

  //
  // Validation
  //

  if (
    !ship_type ||
    !quantity
  ) {

    return NextResponse.json(
      {
        error:
          "Missing required fields"
      },
      {
        status: 400
      }
    )

  }

  const parsedQuantity =
    Number(quantity)

  if (
    Number.isNaN(
      parsedQuantity
    ) ||
    parsedQuantity < 1 ||
    parsedQuantity > 10000
  ) {

    return NextResponse.json(
      {
        error:
          "Invalid quantity"
      },
      {
        status: 400
      }
    )

  }

  if (
    ship_type.length > 200
  ) {

    return NextResponse.json(
      {
        error:
          "Ship type exceeds maximum length"
      },
      {
        status: 400
      }
    )

  }

  if (
    notes &&
    notes.length > 2000
  ) {

    return NextResponse.json(
      {
        error:
          "Notes exceed maximum length"
      },
      {
        status: 400
      }
    )

  }

  //
  // Save Quote
  //

  const { error } =
    await supabase
      .from("fleet_quotes")
      .insert({

        corporation:
          customer.corporation_name,

        character_name:
          customer.character_name,

        ship_type,

        quantity:
          parsedQuantity,

        notes:
`Slack: ${slack_contact ?? "Not Provided"}

${notes ?? ""}`,

        status:
          "Requested"

      })

  if (error) {

    console.error(
      "Quote insert failed:",
      error
    )

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

  //
  // Slack Notification
  //

  try {

    if (
      process.env
        .SLACK_WEBHOOK_URL
    ) {

      await fetch(
        process.env
          .SLACK_WEBHOOK_URL,
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({

              text:
`🚨 NEW QUOTE REQUEST

Pilot:
${customer.character_name}

Corporation:
${customer.corporation_name}

Ship:
${ship_type}

Quantity:
${parsedQuantity}

Slack:
${slack_contact ?? "Not Provided"}

Notes:
${notes ?? "None"}

Status:
Requested`

            })

        }
      )

    }

  } catch (slackError) {

    console.error(
      "Slack notification failed:",
      slackError
    )

  }

  //
  // Success
  //

  return NextResponse.json({
    success: true
  })

}
