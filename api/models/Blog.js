const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   text: {
      type: String
   },
   image: {
      type: Array
   },
   addedBy: {
      type: String
   },
   date: {
      type: Date,
      default: Date.now
   }
})

module.exports = Blog = mongoose.model("blog", BlogSchema)