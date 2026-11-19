import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export default async function HomePage() {

  const cookieStore =
    await cookies();

  const characterName =
    cookieStore.get(
      "character_name"
    )?.value;

  const characterId =
    cookieStore.get(
      "character_id"
    )?.value;

  const supabase =
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!
    );

  const { data: ships } =
    await supabase
      .from("eve_ships")
      .select("buildable");

  const buildableShips =
    ships?.filter(
      ship => ship.buildable
    ).length ?? 0;

  return (

    <main
      className="
      max-w-7xl
      mx-auto
      px-8
      py-12"
    >

      {/* Welcome */}

      <section
        className="
        bg-eve-surface
        rounded-2xl
        border
        border-slate-800
        p-10
        mb-10"
      >

        <div
          className="
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-8"
        >

          {/* Pilot */}

          <div
            className="
            flex
            items-center
            gap-6"
          >

            {characterId && (

              <img
                src={`https://images.evetech.net/characters/${characterId}/portrait?size=256`}
                alt={
                  characterName ??
                  "Pilot"
                }
                className="
                w-32
                h-32
                rounded-xl
                border
                border-slate-700"
              />

            )}

            <div>

              <p
                className="
                text-eve-accent
                uppercase
                tracking-widest
                mb-3"
              >
                Bears Inc Shipyards Welcomes
              </p>

              <h1
                className="
                text-5xl
                font-bold
                mb-2"
              >
                {characterName}
              </h1>

              <p
                className="
                text-slate-400"
              >
                Access to the Bears Inc
                Procurement and
                Manufacturing Network
              </p>

            </div>

          </div>

          {/* Logo */}

          <div
            className="
            flex
            justify-center
            lg:justify-end"
          >

            <Image
              src="/logo.png"
              alt="Bears Inc Shipyards"
              width={300}
              height={300}
              priority
              className="
              w-32
              h-32
              md:w-40
              md:h-40
              lg:w-56
              lg:h-56
              object-contain"
            />

          </div>

        </div>

      </section>

      {/* Dashboard Actions */}

      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-6"
      >

        <DashboardCard
          title="Browse Ships"
          description="
          Browse over 400 manufacturable
          hulls from frigates to capitals."
          href="/ships"
        />

        <DashboardCard
          title="Request a Quote"
          description="
          Request pricing and production
          estimates for any buildable hull."
          href="/blind-quote-request"
        />

        <DashboardCard
          title="My Quotes"
          description="
          Track active and completed
          quotation requests."
          href="/quotes"
        />

        <DashboardCard
          title="Production Jobs"
          description="
          View manufacturing progress
          and delivery schedules."
          href="/production"
        />

      </div>

      {/* Quick Information */}

      <section
        className="
        mt-12
        grid
        md:grid-cols-3
        gap-6"
      >

        <InfoCard
          title="Access Status"
          value="Alliance Verified"
        />

        <InfoCard
          title="Buildable Hulls"
          value={
            buildableShips.toString()
          }
        />

        <InfoCard
          title="Platform"
          value="Bears Inc Procurement"
        />

      </section>

    </main>

  );
}

function DashboardCard({
  title,
  description,
  href
}: {
  title: string;
  description: string;
  href: string;
}) {

  return (

    <Link href={href}>

      <div
        className="
        h-full
        bg-eve-surface
        rounded-xl
        border
        border-slate-800
        p-6
        hover:border-eve-accent
        transition"
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-3"
        >
          {title}
        </h2>

        <p
          className="
          text-slate-400"
        >
          {description}
        </p>

      </div>

    </Link>

  );
}

function InfoCard({
  title,
  value
}: {
  title: string;
  value: string;
}) {

  return (

    <div
      className="
      bg-eve-surface
      rounded-xl
      border
      border-slate-800
      p-6"
    >

      <p
        className="
        text-slate-400
        mb-2"
      >
        {title}
      </p>

      <p
        className="
        text-xl
        font-semibold"
      >
        {value}
      </p>

    </div>

  );
}