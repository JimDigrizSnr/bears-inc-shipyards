import { NextResponse } from "next/server"

export async function GET() {

  const clientId =
    process.env.EVE_CLIENT_ID

  const redirectUri =
    process.env.EVE_REDIRECT_URI

  const state =
    crypto.randomUUID()

  const loginUrl =
    "https://login.eveonline.com/v2/oauth/authorize" +
    "?response_type=code" +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(
      redirectUri!
    )}` +
    "&scope=publicData" +
    `&state=${state}`

  console.log(loginUrl)

  return NextResponse.redirect(
    loginUrl
  )

}