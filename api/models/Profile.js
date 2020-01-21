const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
   bio: {
      type: String
   },
   location: {
      type: String
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
   }
})

module.exports = Profile = mongoose.model("profile", ProfileSchema)