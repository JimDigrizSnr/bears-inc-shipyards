import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import YAML from "yaml"

import { createClient } from "@supabase/supabase-js"

dotenv.config({
  path: path.resolve(
    process.cwd(),
    ".env.local"
  )
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)

const races: Record<number, string> = {

  // Empire Factions

  1: "Caldari State",

  2: "Minmatar Republic",

  4: "Amarr Empire",

  8: "Gallente Federation",

  // Independent & NPC

  16: "Society of Conscious Thought",

  32: "Sansha's Nation",

  128: "ORE",

  135: "Triglavian Collective",

  168: "EDENCOM"

}

const specialFactions: Record<string, string> = {

  // Mordu's Legion

  "Garmur": "Mordu's Legion",
  "Orthrus": "Mordu's Legion",
  "Barghest": "Mordu's Legion",

  "Cobra": "Mordu's Legion",
  "Python": "Mordu's Legion",
  "Sidewinder": "Mordu's Legion",

  // Sisters of EVE

  "Astero": "Sisters of EVE",
  "Stratios": "Sisters of EVE",
  "Nestor": "Sisters of EVE",

  // Deathless Circle

  "Alligator": "Deathless Circle",
  "Warden": "Deathless Circle",
  "Cenotaph": "Deathless Circle",

  // CONCORD

  "Pacifier": "CONCORD",
  "Enforcer": "CONCORD",
  "Marshal": "CONCORD",
  "Monitor": "CONCORD",

  "Concord Army Battleship": "CONCORD",
  "Concord Army Frigate": "CONCORD",

  "Concord Police Battleship": "CONCORD",
  "Concord Police Cruiser": "CONCORD",
  "Concord Police Frigate": "CONCORD",

  "Concord Special Ops Battleship": "CONCORD",
  "Concord Special Ops Frigate": "CONCORD",

  "Concord SWAT Battleship": "CONCORD",
  "Concord SWAT Frigate": "CONCORD",

  "Council Diplomatic Shuttle": "CONCORD"

}

function determineTechLevel(
  name?: string
) {

  const shipName =
    name ?? ""

  if (
    shipName.includes("II")
  ) {
    return "Tech II"
  }

  return "Tech I"

}

function determineRole(
  group?: string
) {

  switch (group) {

    case "Frigate":
      return "Light Combat"

    case "Destroyer":
      return "Fast Combat"

    case "Cruiser":
      return "Medium Combat"

    case "Battlecruiser":
      return "Heavy Combat"

    case "Combat Battlecruiser":
      return "Heavy Combat"

    case "Battleship":
      return "Line Combat"

    case "Industrial Command Ship":
      return "Mining Support"

    case "Capital Industrial Ship":
      return "Industrial Core"

    case "Mining Barge":
      return "Mining"

    case "Exhumer":
      return "Advanced Mining"

    case "Freighter":
      return "Logistics"

    default:
      return null

  }

}

async function importShips() {

  console.log("Loading SDE...")

  const types = YAML.parse(
    fs.readFileSync(
      "./sde/fsd/types.yaml",
      "utf8"
    )
  )

  const groups = YAML.parse(
    fs.readFileSync(
      "./sde/fsd/groups.yaml",
      "utf8"
    )
  )

  let imported = 0

  for (
    const [typeId, type]
    of Object.entries(types)
  ) {

    const ship: any = type

    const group =
      groups[ship.groupID]

    if (!group) {
      continue
    }

    // Only ships

    if (
      group.categoryID !== 6
    ) {
      continue
    }

    const shipName =
      ship.name?.en ?? null

    const groupName =
      group.name?.en ?? null

    const faction =
      specialFactions[
        shipName
      ]
      ??
      (
        ship.raceID
          ? races[
              ship.raceID
            ]
          : undefined
      )
      ??
      "Unknown"

    const factionLogo =
      faction
        .toLowerCase()
        .replaceAll("'", "")
        .replaceAll(" ", "-")

    const record = {

      type_id:
        Number(typeId),

      name:
        shipName,

      description:
        ship.description?.en
        ?? null,

      group_id:
        ship.groupID
        ?? null,

      group_name:
        groupName,

      category_id:
        group.categoryID
        ?? null,

      race_id:
        ship.raceID
        ?? null,

      faction,

      faction_logo:
        `/factions/${factionLogo}.png`,

      hull_class:
        groupName,

      tech_level:
        determineTechLevel(
          shipName
        ),

      role:
        determineRole(
          groupName
        ),

      image_url:
        `https://images.evetech.net/types/${typeId}/render?size=512`,

      published:
        ship.published
        ?? false

    }

    const { error } =
      await supabase
        .from("eve_ships")
        .upsert(
          record,
          {
            onConflict:
              "type_id"
          }
        )

    if (error) {

      console.error(
        `Failed: ${shipName}`,
        error.message
      )

      continue

    }

    imported++

  }

  console.log(
    `Imported ${imported} ships`
  )

}

importShips()
  .then(() => {

    console.log(
      "Import complete"
    )

    process.exit(0)

  })
  .catch((err) => {

    console.error(err)

    process.exit(1)

  })