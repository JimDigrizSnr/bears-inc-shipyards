// middleware.ts

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(
  request: NextRequest
) {

  const pathname =
    request.nextUrl.pathname

  const publicRoutes = [

    "/pilot-login",

    "/access-denied",

    "/api/auth/eve/login",

    "/api/auth/eve/callback",

    "/favicon.ico"

  ]

  const isPublicRoute =
    publicRoutes.some(
      route =>

        pathname === route ||

        pathname.startsWith(
          "/api/auth/"
        )

    )

  if (isPublicRoute) {

    return NextResponse.next()

  }

  const accessGranted =
    request.cookies.get(
      "access_granted"
    )?.value

  const characterId =
    request.cookies.get(
      "character_id"
    )?.value

  //
  // Never logged in
  //

  if (
    !characterId
  ) {

    return NextResponse.redirect(
      new URL(
        "/pilot-login",
        request.url
      )
    )

  }

  //
  // Logged in but not authorised
  //

  if (
    accessGranted !==
    "true"
  ) {

    return NextResponse.redirect(
      new URL(
        "/access-denied",
        request.url
      )
    )

  }

  //
  // Authorised Pilot
  //

  return NextResponse.next()

}

export const config = {

  matcher: [

    "/((?!_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)"

  ]

}