const mongoose = require("mongoose");
const planetSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    required: true,
  },
});

const planet =  mongoose.model("planet", planetSchema);

module.exports = planet;
