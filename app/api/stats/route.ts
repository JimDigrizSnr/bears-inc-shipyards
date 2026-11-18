import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export async function GET() {

  const [
    shipsResult,
    featuredResult
  ] = await Promise.all([

    supabase
      .from("ships")
      .select("*", {
        count: "exact",
        head: true
      })
      .eq("active", true),

    supabase
      .from("ships")
      .select("*", {
        count: "exact",
        head: true
      })
      .eq("featured", true)
      .eq("active", true)

  ])

  const { data: stockData } =
    await supabase
      .from("ships")
      .select("stock")
      .eq("active", true)

  const totalStock =
    stockData?.reduce(
      (sum, ship) =>
        sum + (ship.stock ?? 0),
      0
    ) ?? 0

  return NextResponse.json({

    activeShips:
      shipsResult.count ?? 0,

    featuredShips:
      featuredResult.count ?? 0,

    totalStock

  })

}