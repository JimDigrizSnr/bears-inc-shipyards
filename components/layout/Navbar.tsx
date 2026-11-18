import Link from "next/link"

export default function Navbar() {

  return (

    <nav
      className="
      border-b
      border-slate-800
      bg-slate-950"
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-5
        flex
        justify-between"
      >

        <Link
          href="/"
          className="
          font-bold
          text-xl
          text-yellow-400"
        >
          Bears Inc Shipyards
        </Link>

        <div className="flex gap-6">

          <Link href="/ships">
            Ships
          </Link>

          <Link href="/market">
            Market
          </Link>

          <Link href="/fleet-order">
            Fleet Orders
          </Link>

          <Link href="/login">
            Login
          </Link>

        </div>

      </div>

    </nav>

  )
}