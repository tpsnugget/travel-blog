const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
   addedById: {
      type: String
   },
   addedByUsername: {
      type: String
   },
   date: {
      type: Date,
      default: Date.now
   },
   hasComments: {
      type: Boolean,
      default: false
   },
   images: {
      type: Array
   },   text: {
      type: String
   },   
   text: {
      type: String
   },
   title: {
      type: String,
      required: true
   }
})

module.exports = Blog = mongoose.model("blog", BlogSchema)