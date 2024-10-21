const cds = require("@sap/cds");
const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");

module.exports = cds.on("served", async () => {
  const { JSONCities } = cds.entities;
  try {
    cities = await getCitiesFromJSON();
    return INSERT.into(JSONCities).entries(cities);
  } catch (err) {
    console.error(err.message);
  }
});

async function getCitiesFromJSON() {
  const filePath = resolve("db/data/cities.json");
  const contents = await readFile(filePath, { encoding: "utf8" });

  return JSON.parse(contents);
}
