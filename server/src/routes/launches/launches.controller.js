const {
  getData,
  newLaunch,
  launchAborted,
  isLaunchFound,
} = require("../../models/launches.model");
async function getAllLaunches(req, res) {
  return res.status(200).json(await getData());
}
async function postAllLaunches(req, res) {
  let launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: "Please fill all details",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Date",
    });
  }
  await newLaunch(launch);
  return res.status(201).json(launch);
}
async function deleteLaunch(req, res) {
  const launchId = parseInt(req.params.id);
const exist = await isLaunchFound(launchId)
  if (!exist) {
    return res.status(400).json({
      error: "Launch not found",
    });
  }
  const aborted =await launchAborted(launchId);
  if (!aborted) {
    return res.status(400).json({
      error:"Not Aborted"
    })
  }
  return res.status(200).json({
    ok:true
  });
}

module.exports = {
  getAllLaunches,
  postAllLaunches,
  deleteLaunch,
};
