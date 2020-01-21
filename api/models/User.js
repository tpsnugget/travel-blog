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
   name: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   hasProfile: {
      type: Boolean,
      default: false
   }

})

module.exports = User = mongoose.model("user", UserSchema)