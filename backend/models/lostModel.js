const mongoose = require("mongoose");

const lostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

module.exports = Lost = mongoose.model("losts", lostSchema);
