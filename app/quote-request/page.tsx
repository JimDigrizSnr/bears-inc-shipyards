import { Suspense } from "react"
import QuoteRequestForm from "./QuoteRequestForm"

export default function QuoteRequestPage() {

  return (

    <Suspense
      fallback={
        <main className="max-w-3xl mx-auto p-8">
          Loading quote request...
        </main>
      }
    >

      <QuoteRequestForm />

    </Suspense>

  )

}