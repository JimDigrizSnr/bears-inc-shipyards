// app/pilot-login/page.tsx

"use client"

import Image from "next/image"

export default function PilotLoginPage() {

  const clientId =
    process.env
      .NEXT_PUBLIC_EVE_CLIENT_ID

  const redirectUri =
    process.env
      .NEXT_PUBLIC_EVE_REDIRECT_URI

  const loginUrl =
    "https://login.eveonline.com/v2/oauth/authorize" +
    "?response_type=code" +
    "&scope=publicData" +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(
      redirectUri ?? ""
    )}`

  return (

    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-8"
    >

      <div
        className="
        max-w-2xl
        w-full
        bg-slate-900
        rounded-2xl
        p-10
        border
        border-slate-800"
      >

        <h1
          className="
          text-5xl
          font-bold
          mb-6"
        >
          Pilot Login
        </h1>

        <p
          className="
          text-slate-400
          mb-8"
        >
          Authenticate with your EVE Online character to access
          quotations, order tracking and future customer portal
          services.
        </p>

        <div
          className="
          bg-slate-800
          rounded-xl
          p-6
          mb-8"
        >

          <h2
            className="
            text-xl
            font-bold
            mb-3"
          >
            Why login?
          </h2>

          <ul
            className="
            space-y-2
            text-slate-300"
          >

            <li>
              • View quote requests
            </li>

            <li>
              • Track production progress
            </li>

            <li>
              • Review deliveries
            </li>

            <li>
              • Link requests to your EVE character
            </li>

          </ul>

        </div>

        <div
          className="
          flex
          justify-center"
        >

<a href="/api/auth/eve/login">

  <Image
    src="/eve-sso-login-black-large.png"
    alt="Login with EVE Online"
    width={270}
    height={45}
    priority
  />

</a>

        </div>

      </div>

    </main>

  )

}