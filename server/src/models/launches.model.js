const launchDb = require("./launches.mongo");
const planet = require("./planets.mongo");
const launches = new Map();
let flightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2023"),
  target: "Kepler-442 b",
  customer: ["VI", "NASA", "ISRO"],
  upcoming: true,
  success: true,
};
async function isLaunchFound(id) {
  return await launchDb.findOne({
    flightNumber:id
  });
}
async function getLatestNumber() {
  const latestLaunch = await launchDb.findOne({}).sort("-flightNumber");
  if (!latestLaunch) {
    return flightNumber;
  }
  return latestLaunch.flightNumber;
}

async function saveLaunch(data) {
  const planets = await planet.find({
    kepler_name: data.target,
  });
  if (!planets) {
    throw new Error("No matching planets are found");
  }
  await launchDb.updateOne(
    {
      flightNumber: flightNumber,
    },
    data,
    {
      upsert: true,
    }
  );
}
saveLaunch(launch);
async function getData() {
  return await launchDb.find(
    {},{
      "__v":0,
      "__id":0
    }
  );
}
async function newLaunch(data) {
  const newFlight = (await getLatestNumber()) + 1;
  const newLaunch = Object.assign(data, {
    flightNumber: newFlight,
    upcoming: true,
    success: true,
    customer: ["VI", "ISRO"],
  });
  saveLaunch(newLaunch);
}

async function launchAborted(id) { 
const response = await launchDb.updateOne({
   flightNumber:id,
 },{
  upcoming:false,
  success:false
 })
 return response.modifiedCount ===1 
}
module.exports = {
  getData,
  newLaunch,
  launchAborted,
  isLaunchFound,
};
