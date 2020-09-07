const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fname: { type: String, },
  sname: { type: String, },
  rights: { type: String, },
  groups: [],
})

module.exports = model('User', schema)