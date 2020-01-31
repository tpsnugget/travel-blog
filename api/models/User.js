const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
   avatar: {
      type: String
   },
   date: {
      type: Date,
      default: Date.now
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   hasProfile: {
      type: Boolean,
      default: false
   },
   lastLoggedInDate: {
      type: Date,
      default: Date.now
   },
   loggedInDate: {
      type: Date,
      default: Date.now
   },
   password: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true
   }
})

module.exports = User = mongoose.model("user", UserSchema)