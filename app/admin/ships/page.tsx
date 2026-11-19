import { createClient } from "@supabase/supabase-js";
import ShipActions from "@/components/admin/ShipActions";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export default async function ShipsPage() {

  const { data: ships } =
    await supabase
      .from("admin_ship_inventory")
      .select("*")
      .order("name");

  const totalShips =
    ships?.length ?? 0;

  const buildableShips =
    ships?.filter(
      ship => ship.buildable
    ).length ?? 0;

  const capitalShips =
    ships?.filter(
      ship => ship.is_capital
    ).length ?? 0;

  const tech3Ships =
    ships?.filter(
      ship =>
        ship.tech_level ===
        "Tech III"
    ).length ?? 0;

  return (

    <main className="p-8">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Ship Inventory
        </h1>

        <p className="text-slate-400 mt-2">
          Bears Inc Shipyard hull
          management and catalogue
          inventory.
        </p>

      </div>

      {/* Dashboard */}

      <div
        className="
        grid
        md:grid-cols-4
        gap-4
        mb-8"
      >

        <div
          className="
          bg-slate-900
          rounded-xl
          p-4"
        >
          <div className="text-slate-400">
            Total Ships
          </div>

          <div className="text-3xl font-bold">
            {totalShips}
          </div>
        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-4"
        >
          <div className="text-slate-400">
            Buildable
          </div>

          <div className="text-3xl font-bold text-green-400">
            {buildableShips}
          </div>
        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-4"
        >
          <div className="text-slate-400">
            Capital Ships
          </div>

          <div className="text-3xl font-bold text-red-400">
            {capitalShips}
          </div>
        </div>

        <div
          className="
          bg-slate-900
          rounded-xl
          p-4"
        >
          <div className="text-slate-400">
            Tech III
          </div>

          <div className="text-3xl font-bold text-blue-400">
            {tech3Ships}
          </div>
        </div>

      </div>

      {/* Actions */}

      <div className="mb-8">

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

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left p-3">
                Name
              </th>

              <th className="text-left p-3">
                Race
              </th>

              <th className="text-left p-3">
                Class
              </th>

              <th className="text-left p-3">
                Tech
              </th>

              <th className="text-left p-3">
                Buildable
              </th>

              <th className="text-left p-3">
                Capital
              </th>

              <th className="text-left p-3">
                Stock
              </th>

              <th className="text-left p-3">
                Price
              </th>

              <th className="text-left p-3">
                Active
              </th>

              <th className="text-left p-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {ships?.map(
              (ship) => (

                <tr
                  key={ship.id}
                  className="
                  border-b
                  border-slate-800"
                >

                  <td className="p-3 font-medium">
                    {ship.name}
                  </td>

                  <td className="p-3">
                    {ship.race}
                  </td>

                  <td className="p-3">
                    {ship.group_name}
                  </td>

                  <td className="p-3">
                    {ship.tech_level}
                  </td>

                  <td className="p-3">

                    {ship.buildable
                      ? "✅"
                      : "❌"}

                  </td>

                  <td className="p-3">

                    {ship.is_capital
                      ? "✅"
                      : "—"}

                  </td>

                  <td className="p-3">
                    {ship.stock}
                  </td>

                  <td className="p-3">
                    {ship.price?.toLocaleString()}
                    {" "}
                    ISK
                  </td>

                  <td className="p-3">

                    {ship.active
                      ? "✅"
                      : "❌"}

                  </td>

                  <td className="p-3">

                    <ShipActions
                      id={ship.id}
                      stock={ship.stock}
                    />

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </main>

  );
}