const express = require("express");
const planetRoute = express.Router();
const { getPlanets } = require("./planet.controller")
planetRoute.get("/", getPlanets);

module.exports = planetRoute;