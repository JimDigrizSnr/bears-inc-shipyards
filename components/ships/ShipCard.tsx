import Image from "next/image"
import Link from "next/link"

function FactionBadge({
  faction,
}: {
  faction: string
}) {
  const styles: Record<string, string> = {
    "Caldari State":
      "bg-blue-900 text-blue-300",

    "Amarr Empire":
      "bg-yellow-900 text-yellow-300",

    "Gallente Federation":
      "bg-green-900 text-green-300",

    "Minmatar Republic":
      "bg-red-900 text-red-300",

    ORE:
      "bg-orange-900 text-orange-300",

    Pirate:
      "bg-purple-900 text-purple-300",
  }

  const logos: Record<string, string> = {
    "Caldari State":
      "/factions/caldari.png",

    "Amarr Empire":
      "/factions/amarr.png",

    "Gallente Federation":
      "/factions/gallente.png",

    "Minmatar Republic":
      "/factions/minmatar.png",

    ORE:
      "/factions/ore.png",

    Pirate:
      "/factions/pirate.png",
  }

  return (

    <span
      className={`
        inline-flex
        items-center
        gap-2
        px-2
        py-1
        rounded
        text-xs
        font-semibold
        ${
          styles[faction] ??
          "bg-slate-800 text-slate-300"
        }
      `}
    >

      <Image
        src={
          logos[faction] ??
          "/factions/pirate.png"
        }
        alt={faction}
        width={16}
        height={16}
        className="rounded-sm"
      />

      {faction}

    </span>

  )
}

function getFactionBorder(
  faction: string
) {

  switch (faction) {

    case "Caldari State":
      return "hover:border-blue-500"

    case "Amarr Empire":
      return "hover:border-yellow-500"

    case "Gallente Federation":
      return "hover:border-green-500"

    case "Minmatar Republic":
      return "hover:border-red-500"

    case "ORE":
      return "hover:border-orange-500"

    case "Pirate":
      return "hover:border-purple-500"

    default:
      return "hover:border-eve-accent"

  }

}

export default function ShipCard({
  ship,
}: any) {

  return (

    <Link
      href={`/ships/${ship.slug}`}
    >

      <div
        className={`
          bg-eve-surface
          rounded-xl
          overflow-hidden
          border
          border-slate-800
          ${getFactionBorder(ship.faction)}
          hover:-translate-y-1
          hover:shadow-xl
          transition-all
          duration-300
        `}
      >

        {/* Ship Render */}

        <div
          className="
          h-56
          bg-slate-800
          flex
          items-center
          justify-center"
        >

          {ship.image_url ? (

            <Image
              src={ship.image_url}
              alt={ship.name}
              width={512}
              height={512}
              className="
              w-full
              h-full
              object-contain
              p-3"
            />

          ) : (

            <div className="text-slate-500">
              No Image Available
            </div>

          )}

        </div>

        {/* Content */}

        <div className="p-5">

          <h3
            className="
            text-2xl
            font-bold"
          >
            {ship.name}
          </h3>

          <div className="mt-2">

            <FactionBadge
              faction={ship.faction}
            />

          </div>

          <span
            className="
            inline-block
            mt-3
            px-2
            py-1
            text-xs
            bg-slate-800
            rounded"
          >
            {ship.hull_class ??
              ship.category}
          </span>

          <div className="mt-4">

            <p
              className="
              text-green-400
              font-semibold"
            >
              {ship.price.toLocaleString()}
              {" "}
              ISK
            </p>

            <p
              className={
                ship.stock > 10
                  ? "text-green-400"
                  : ship.stock > 0
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            >
              Stock: {ship.stock}
            </p>

          </div>

          <div
            className="
            mt-5
            text-eve-accent
            font-semibold"
          >
            View Hull →
          </div>

        </div>

      </div>

    </Link>

  )

}