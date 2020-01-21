const express = require("express"),
   router = express.Router()

   const Blog = require("../../models/Blog")

// @route   GET api/blogs
// @desc    Test route
// @access  Public access
router.post("/", async (req, res) => {
   console.log("Blog POST route req.body is ", req.body)

   const { addedBy, images, text, title } = req.body

   const blog = new Blog({
      addedBy,
      images,
      text,
      title
   })

   await blog.save()

   res.send("Post GET Route is up Man!")
})

module.exports = router