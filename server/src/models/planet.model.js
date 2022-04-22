const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planet = require("./planets.mongo");
const verify = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};
async function loadplanets() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "planet.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (verify(data)) {
          return savePlanet(data);
        }
      })
      .on("error", (er) => {
        console.log(er);
        reject(er);
      })
      .on("end", async () => {
        const count = (await getData()).length;
        console.log("parsing over", count);
        resolve();
      });
  });
}

async function getData() {
  return await planet.find(
    {},
    {
      __v: 0,
      __id: 0,
    }
  );
}
async function savePlanet(data) {
  return await planet.updateOne(
    {
      kepler_name: data.kepler_name,
    },
    {
      kepler_name: data.kepler_name,
    },
    {
      upsert: true,
    }
  );
}
module.exports = {
  loadplanets,
  getData,
};
