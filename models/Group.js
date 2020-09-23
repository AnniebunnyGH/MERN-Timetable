const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  tag: { type: String, required: true, uniq: true },
  members: [],
  creater: { type: String },
});

module.exports = model("Group", schema);
