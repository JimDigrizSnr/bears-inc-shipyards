import { cookies } from "next/headers"

export default async function PortalPage() {

  const cookieStore =
    await cookies()

  const characterName =
    cookieStore.get(
      "character_name"
    )?.value

  return (

    <main
      className="
      max-w-7xl
      mx-auto
      p-8"
    >

      <h1
        className="
        text-5xl
        font-bold
        mb-4"
      >
        Pilot Portal
      </h1>

      <p
        className="
        text-slate-400"
      >
        Welcome,
        {" "}
        {characterName}
      </p>

    </main>

  )

}