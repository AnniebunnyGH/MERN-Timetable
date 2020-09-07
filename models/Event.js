const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  start: { type: String, required: true, },
  duration: { type: String, required: true, },
  host: { type: String },
  groups: [],
  creator: { type: String },
})

module.exports = model('Event', schema)