const express = require("express"),
   router = express.Router()

   const Blog = require("../../models/Blog")

// @route   GET api/blogs
// @desc    Test route
// @access  Public access
router.get("/", async (req, res) => {
   // console.log("Blog GET route")

   const blogs = await Blog.find()

   // console.log("blogs are ", blogs)

   res.send(blogs)
})

router.get("/show/:id", async (req, res) => {
   // console.log("Blog GET One route req.params ", req.params)

   const blogs = await Blog.findById(req.params.id)

   // var { date } = blogs
   // Date.format(date, "ddd, MMM DD YYYY", true)
   // console.log("api GET One Blog date is ", date)

   // console.log("blogs are ", blogs)

   res.send(blogs)
})

router.post("/", async (req, res) => {
   // console.log("Blog POST route req.body is ", req.body)

   const { addedById, addedByUsername, images, text, title } = req.body

   // console.log("NewBlog POST req.body is ", req.body)

   const blog = await new Blog({
      addedById,
      addedByUsername,
      images,
      text,
      title
   })

   // console.log("api POST blog from await new Blog is ", blog)

   const newBlog = await blog.save()
   // console.log("api POST NewBlog answer from DB is ", newBlog)

   res.json(newBlog)
})

module.exports = router