import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function GET(
  request: Request
) {

  const { searchParams } =
    new URL(request.url)

  const code =
    searchParams.get("code")

  if (!code) {

    return NextResponse.json(
      {
        error:
          "Missing authorisation code"
      },
      {
        status: 400
      }
    )

  }

  const clientId =
    process.env.EVE_CLIENT_ID!

  const clientSecret =
    process.env.EVE_CLIENT_SECRET!

  const redirectUri =
    process.env.EVE_REDIRECT_URI!

  console.log(
    "CCP CALLBACK STARTED"
  )

  const tokenResponse =
    await fetch(
      "https://login.eveonline.com/v2/oauth/token",
      {
        method: "POST",

        headers: {

          Authorization:
            `Basic ${Buffer
              .from(
                `${clientId}:${clientSecret}`
              )
              .toString("base64")}`,

          "Content-Type":
            "application/x-www-form-urlencoded"

        },

        body:
          new URLSearchParams({

            grant_type:
              "authorization_code",

            code,

            redirect_uri:
              redirectUri

          })

      }
    )

  const tokenData =
    await tokenResponse.json()

  console.log(
    "TOKEN RECEIVED"
  )

  const verifyResponse =
    await fetch(
      "https://login.eveonline.com/oauth/verify",
      {
        headers: {

          Authorization:
            `Bearer ${tokenData.access_token}`

        }
      }
    )

  const character =
    await verifyResponse.json()

  console.log(
    "CHARACTER:",
    character
  )

  const characterId =
    character.CharacterID

  const characterName =
    character.CharacterName

  const characterResponse =
    await fetch(
      `https://esi.evetech.net/latest/characters/${characterId}/`
    )

  console.log(
    "CHARACTER RESPONSE STATUS:",
    characterResponse.status
  )

  const characterData =
    await characterResponse.json()

  console.log(
    "CHARACTER DATA:",
    characterData
  )

  const corporationId =
    characterData.corporation_id

  let corporationName =
    ""

  let allianceId:
    number | null = null

  let allianceName =
    ""

  if (corporationId) {

    const corporationResponse =
      await fetch(
        `https://esi.evetech.net/latest/corporations/${corporationId}/`
      )

    console.log(
      "CORPORATION RESPONSE STATUS:",
      corporationResponse.status
    )

    const corporationData =
      await corporationResponse.json()

    console.log(
      "CORPORATION DATA:",
      corporationData
    )

    corporationName =
      corporationData.name ?? ""

    allianceId =
      corporationData.alliance_id ?? null

  }

  if (allianceId) {

    const allianceResponse =
      await fetch(
        `https://esi.evetech.net/latest/alliances/${allianceId}/`
      )

    console.log(
      "ALLIANCE RESPONSE STATUS:",
      allianceResponse.status
    )

    const allianceData =
      await allianceResponse.json()

    console.log(
      "ALLIANCE DATA:",
      allianceData
    )

    allianceName =
      allianceData.name ?? ""

  }

  console.log({
    characterName,
    corporationId,
    corporationName,
    allianceId,
    allianceName
  })

  let accessGranted =
    false

  let allowedAlliance =
    null

  if (allianceId) {

    const result =
      await supabase
        .from(
          "allowed_alliances"
        )
        .select("*")
        .eq(
          "alliance_id",
          allianceId
        )
        .eq(
          "active",
          true
        )
        .maybeSingle()

    allowedAlliance =
      result.data

    console.log({

      allianceId,

      allowedAlliance,

      allianceError:
        result.error

    })

    accessGranted =
      !!allowedAlliance

  }

  console.log({

    characterName,

    corporationName,

    allianceId,

    allianceName,

    accessGranted

  })

  await supabase
    .from("customers")
    .upsert(
      {

        eve_character_id:
          characterId,

        character_name:
          characterName,

        corporation_id:
          corporationId,

        corporation_name:
          corporationName,

        alliance_id:
          allianceId,

        alliance_name:
          allianceName,

        access_granted:
          accessGranted

      },
      {
        onConflict:
          "eve_character_id"
      }
    )

  if (!accessGranted) {

    console.log(
      "ACCESS DENIED"
    )

   return NextResponse.redirect(
  `${process.env.NEXT_PUBLIC_APP_URL}/access-denied`
)
    

  }

  console.log(
    "ACCESS GRANTED"
  )

  const response =
  NextResponse.redirect(
    process.env.NEXT_PUBLIC_APP_URL!
  )
  response.cookies.set(
    "character_id",
    String(
      characterId
    ),
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite:
        "lax",
      path: "/",
    }
  )

  response.cookies.set(
    "character_name",
    characterName,
    {
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite:
        "lax",
      path: "/",
      
    }
  )

  response.cookies.set(
    "access_granted",
    "true",
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite:
        "lax",
      path: "/",
    }
  )

  return response

}