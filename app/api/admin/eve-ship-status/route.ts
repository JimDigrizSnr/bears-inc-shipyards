import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export async function GET() {

  const { data, error } =
    await supabase
      .from("admin_ship_inventory")
      .select(`
        buildable,
        is_capital,
        tech_level,
        featured,
        active
      `);

  if (error) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );

  }

  const ships = data ?? [];

  const totalShips =
    ships.length;

  const buildableShips =
    ships.filter(
      ship => ship.buildable
    ).length;

  const capitalShips =
    ships.filter(
      ship => ship.is_capital
    ).length;

  const tech1Ships =
    ships.filter(
      ship =>
        ship.tech_level ===
        "Tech I"
    ).length;

  const tech2Ships =
    ships.filter(
      ship =>
        ship.tech_level ===
        "Tech II"
    ).length;

  const tech3Ships =
    ships.filter(
      ship =>
        ship.tech_level ===
        "Tech III"
    ).length;

  const featuredShips =
    ships.filter(
      ship => ship.featured
    ).length;

  const activeShips =
    ships.filter(
      ship => ship.active
    ).length;

  return NextResponse.json({

    totalShips,

    buildableShips,

    capitalShips,

    tech1Ships,

    tech2Ships,

    tech3Ships,

    featuredShips,

    activeShips

  });

}