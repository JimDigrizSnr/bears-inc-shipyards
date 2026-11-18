import Link from "next/link"
import Image from "next/image"
import { cookies } from "next/headers"

export default async function HomePage() {

  const cookieStore =
    await cookies()

  const characterName =
    cookieStore.get(
      "character_name"
    )?.value

  const characterId =
    cookieStore.get(
      "character_id"
    )?.value

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
                src={
                  `https://images.evetech.net/characters/${characterId}/portrait?size=256`
                }
                alt={
                  characterName
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
                Alliance Verified Pilot
              </p>

            </div>

          </div>

          {/* Logo */}

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
          View available hulls and procurement options."
          href="/ships"
        />

        <DashboardCard
          title="Request a Quote"

description="
Request any buildable hull from across New Eden."
href="/blind-quote-request"
        />

        <DashboardCard
          title="My Quotes"
          description="
          Track active and completed quotation requests."
          href="/quotes"
        />

        <DashboardCard
          title="Production Jobs"
          description="
          View manufacturing progress and deliveries."
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
          title="Authentication"
          value="CCP SSO"
        />

        <InfoCard
          title="Platform"
          value="Bears Inc Procurement"
        />

      </section>

    </main>

  )

}

function DashboardCard({
  title,
  description,
  href
}: {
  title: string
  description: string
  href: string
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

  )

}

function InfoCard({
  title,
  value
}: {
  title: string
  value: string
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

  )

}