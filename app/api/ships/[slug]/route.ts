import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  const { slug } =
    await params;

  const {
    data,
    error,
  } = await supabase
    .from("admin_ship_inventory")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 404,
      }
    );

  }

  return NextResponse.json(
    data
  );
}