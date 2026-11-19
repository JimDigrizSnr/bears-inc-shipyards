import { NextResponse } from "next/server";

export async function GET() {

  const response =
    NextResponse.redirect(
      process.env.NEXT_PUBLIC_APP_URL!
    );

  response.cookies.delete(
    "character_id"
  );

  response.cookies.delete(
    "character_name"
  );

  response.cookies.delete(
    "access_granted"
  );

  return response;
}