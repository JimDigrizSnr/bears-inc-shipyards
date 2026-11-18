export default function AccessDeniedPage() {

  return (

    <main
      className="
      max-w-3xl
      mx-auto
      p-12"
    >

      <h1
        className="
        text-5xl
        font-bold
        mb-6"
      >
        Access Denied
      </h1>

      <p
        className="
        text-slate-400"
      >
        Your EVE character was
        authenticated successfully,
        but your alliance does not
        currently have access to the
        Bears Inc procurement platform.
      </p>

    </main>

  )

}