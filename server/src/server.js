const http = require("http");
const mongoose = require("mongoose");
const { loadplanets } = require("./models/planet.model");
const PORT = process.env.PORT || 80;
const app = require("./app");
const server = http.createServer(app);
const DB =
  "mongodb+srv://vashu:vashudev143@cluster0.3hdmt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connection.once("open", () => {
  console.log("db");
});
mongoose.connection.on("error", (er) => {
  console.error(er);
});
async function startServer() {
  await mongoose.connect(DB);
  await loadplanets();
  server.listen(PORT, async () => {
    console.log(`server running on port ${PORT}`);
  });
}
startServer();
