const express = require("express");
const launchesRouter = express.Router();
const {
  getAllLaunches,
  postAllLaunches,
  deleteLaunch,
} = require("./launches.controller");
launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", postAllLaunches);
launchesRouter.delete("/:id", deleteLaunch);
module.exports = launchesRouter;
