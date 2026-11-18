import { createClient } from "@supabase/supabase-js"
import ShipActions from "@/components/admin/ShipActions"
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

export default async function ShipsPage() {

  const { data: ships } =
    await supabase
      .from("ships")
      .select("*")
      .order("name")

  return (
    <main className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Ship Inventory
      </h1>

      <a
        href="/admin/ships/new"
        className="
        bg-yellow-500
        text-black
        px-4
        py-2
        rounded"
      >
        Add Ship
      </a>

      <table className="w-full mt-8">

        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {ships?.map((ship) => (

            <tr key={ship.id}>

              <td>{ship.name}</td>

              <td>{ship.category}</td>

              <td>{ship.stock}</td>

              <td>
                {ship.price.toLocaleString()}
              </td>

	      <td>

  <ShipActions
    id={ship.id}
    stock={ship.stock}
  />

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </main>
  )
}