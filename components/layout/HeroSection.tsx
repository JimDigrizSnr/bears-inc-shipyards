import Link from "next/link"

export default function HeroSection(){

  return (

    <section
      className="
      min-h-[80vh]
      flex
      items-center"
    >

      <div className="max-w-6xl mx-auto px-6">

        <h1
          className="
          text-6xl
          font-bold
          leading-tight"
        >
          Bears Inc Shipyards
        </h1>

        <p
          className="
          text-2xl
          mt-6
          text-slate-300"
        >
          Building the Ships That Build Empires
        </p>

        <p
          className="
          mt-6
          max-w-2xl
          text-slate-400"
        >
          Industrial manufacturing,
          fleet procurement and
          alliance logistics
          across New Eden.
        </p>

        <div className="flex gap-4 mt-10">

          <Link
            href="/ships"
            className="
            px-6
            py-3
            rounded-lg
            bg-yellow-500
            text-black
            font-semibold"
          >
            Browse Ships
          </Link>

          <Link
            href="/fleet-order"
            className="
            px-6
            py-3
            rounded-lg
            border"
          >
            Fleet Orders
          </Link>

        </div>

      </div>

    </section>

  )
}