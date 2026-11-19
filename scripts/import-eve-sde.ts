import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import YAML from "yaml";
import { createClient } from "@supabase/supabase-js";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local")
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

function loadYaml(file: string) {
  return YAML.parse(
    fs.readFileSync(
      path.resolve(
        process.cwd(),
        "sde",
        "fsd",
        file
      ),
      "utf8"
    )
  );
}

function getDogmaValue(
  attrs: any[],
  attributeId: number
): number | null {

  const found = attrs?.find(
    (a) =>
      a.attributeID === attributeId
  );

  return found?.value ?? null;
}

function determineTechLevel(
  ship: any
) {

  switch (ship.techLevel) {

    case 1:
      return "Tech I";

    case 2:
      return "Tech II";

    case 3:
      return "Tech III";

    default:
      return "Special";
  }
}

const CAPITAL_GROUPS = new Set([
  "Carrier",
  "Dreadnought",
  "Force Auxiliary",
  "Supercarrier",
  "Titan",
  "Freighter",
  "Jump Freighter",
  "Capital Industrial Ship"
]);

const INDUSTRIAL_GROUPS = new Set([
  "Industrial",
  "Transport Ship",
  "Deep Space Transport",
  "Blockade Runner",
  "Mining Barge",
  "Exhumer",
  "Industrial Command Ship",
  "Capital Industrial Ship"
]);

async function importShips() {

  console.log(
    "Loading SDE..."
  );

  const types =
    loadYaml("types.yaml");

  const groups =
    loadYaml("groups.yaml");

  const races =
    loadYaml("races.yaml");

  const factions =
    loadYaml("factions.yaml");

  const marketGroups =
    loadYaml("marketGroups.yaml");

  const blueprints =
    loadYaml("blueprints.yaml");

  const typeDogma =
    loadYaml("typeDogma.yaml");

  console.log(
    "Building blueprint lookup..."
  );

  const blueprintLookup =
    new Map<number, number>();

  for (
    const blueprint of Object.values<any>(
      blueprints
    )
  ) {

    const products =
      blueprint.activities
        ?.manufacturing
        ?.products;

    if (!products) continue;

    for (
      const product of products
    ) {

      blueprintLookup.set(
        product.typeID,
        blueprint.blueprintTypeID
      );
    }
  }

  let imported = 0;

  for (
    const [typeId, rawType]
    of Object.entries<any>(
      types
    )
  ) {

    const ship = rawType;

    if (!ship.published)
      continue;

    const group =
      groups[ship.groupID];

    if (!group)
      continue;

    if (
      group.categoryID !== 6
    ) {
      continue;
    }

    const shipName =
      ship.name?.en ??
      null;

    const groupName =
      group.name?.en ??
      null;

    const race =
      races[
        ship.raceID
      ]?.name?.en ??
      null;

    const faction =
      factions[
        ship.factionID
      ]?.name?.en ??
      race ??
      null;

    const marketGroup =
      marketGroups[
        ship.marketGroupID
      ];

    const marketGroupName =
      marketGroup?.name?.en ??
      null;

    const dogma =
      typeDogma[
        Number(typeId)
      ];

    const attrs =
      dogma?.dogmaAttributes
      ?? [];

    const buildable =
      blueprintLookup.has(
        Number(typeId)
      );

    const blueprintTypeId =
      blueprintLookup.get(
        Number(typeId)
      ) ?? null;

    const record = {

      type_id:
        Number(typeId),

      name:
        shipName,

      description:
        ship.description?.en
        ?? null,

      faction,

      race,

      market_group:
        marketGroupName,

      market_group_name:
        marketGroupName,

      group_name:
        groupName,

      hull_class:
        groupName,

      group_id:
        ship.groupID
        ?? null,

      category:
        "Ship",

      category_id:
        group.categoryID
        ?? null,

      race_id:
        ship.raceID
        ?? null,

      tech_level:
        determineTechLevel(
          ship
        ),

      npc_faction:
        faction,

      buildable,

      blueprint_type_id:
        blueprintTypeId,

      player_ownable:
        ship.published,

      image_url:
        `https://images.evetech.net/types/${typeId}/render?size=512`,

      market_group_id:
        ship.marketGroupID
        ?? null,

      high_slots:
        getDogmaValue(
          attrs,
          14
        ),

      mid_slots:
        getDogmaValue(
          attrs,
          13
        ),

      low_slots:
        getDogmaValue(
          attrs,
          12
        ),

      turret_hardpoints:
        getDogmaValue(
          attrs,
          102
        ),

      launcher_hardpoints:
        getDogmaValue(
          attrs,
          101
        ),

      shield_hp:
        getDogmaValue(
          attrs,
          263
        ),

      armor_hp:
        getDogmaValue(
          attrs,
          265
        ),

      structure_hp:
        getDogmaValue(
          attrs,
          9
        ),

      cargo_capacity:
        getDogmaValue(
          attrs,
          38
        ),

      is_capital:
        CAPITAL_GROUPS.has(
          groupName
        ),

      is_industrial:
        INDUSTRIAL_GROUPS.has(
          groupName
        ),

      published:
        ship.published
    };

    const { error } =
      await supabase
        .from("eve_ships")
        .upsert(
          record,
          {
            onConflict:
              "type_id"
          }
        );

    if (error) {

      console.error(
        `Failed: ${shipName}`,
        error.message
      );

      continue;
    }

    imported++;

    if (
      imported % 25 === 0
    ) {

      console.log(
        `Imported ${imported}`
      );
    }
  }

  console.log(
    `Imported ${imported} ships`
  );
}

importShips()
  .then(() => {

    console.log(
      "Import complete"
    );

    process.exit(0);
  })
  .catch((err) => {

    console.error(err);

    process.exit(1);
  });