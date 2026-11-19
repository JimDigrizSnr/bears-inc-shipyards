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
      .select("*")
      .eq("featured", true)
      .eq("active", true)
      .order("price", {
        ascending: false
      })
      .limit(1)
      .single();

  if (error) {
    return NextResponse.json(null);
  }

  return NextResponse.json(data);
}
