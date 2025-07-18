const mongoose = require("mongoose");

const formattedJsonSchema = new mongoose.Schema({
  originalJson: { type: String, required: true },
  formattedJson: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FormattedJson", formattedJsonSchema);