const { getData } = require("../../models/planet.model");
async function getPlanets(req, res) {
  return res.status(200).json(await getData());
}
module.exports = {
  getPlanets,
};
