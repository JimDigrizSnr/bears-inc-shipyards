import FleetOrderForm from "@/components/forms/FleetOrderForm"

export default function FleetOrderPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Fleet Order Request
      </h1>

      <p className="text-slate-400 mb-6">
        Request a quote for bulk ship purchases,
        corporate procurement, or alliance fleet
        replacement programs.
      </p>

      <FleetOrderForm />
    </main>
  )
}