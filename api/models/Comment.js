const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
   addedById: {
      type: String
   },
   addedByUsername: {
      type: String
   },
   blogId: {
      type: String
   },
   date: {
      type: Date,
      default: Date.now
   },
   commentText: {
      type: String
   }
})

module.exports = Comment = mongoose.model("comment", CommentSchema)