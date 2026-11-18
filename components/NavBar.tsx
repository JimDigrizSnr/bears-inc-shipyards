import Link from "next/link"

export default function NavBar() {

  return (

    <nav
      className="
      bg-eve-surface
      border-b
      border-slate-800"
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        justify-between
        items-center"
      >

        <Link
          href="/"
          className="
          text-eve-accent
          font-bold
          text-xl"
        >
          Bears Inc Shipyards
        </Link>

        <div
          className="
          flex
          gap-6
          text-sm"
        >

<Link href="/">
  Home
</Link>

<Link href="/ships">
  Ship Catalogue
</Link>

<Link href="/fleet-order">
  Ship Orders
</Link>

<Link href="/admin">
  Operations Centre
</Link>

        </div>

      </div>

    </nav>

  )

}
