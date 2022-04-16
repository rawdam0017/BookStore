const Mongoose = require("mongoose")
const Schema = Mongoose.Schema;

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Birthday: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
    required: true,
  },
 
})

const User = Mongoose.model("user", UserSchema)
module.exports = User