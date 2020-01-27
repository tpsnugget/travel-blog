const express = require("express"),
   router = express.Router(),
   auth = require("../../middleware/auth")

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

   const blog = await Blog.findById(req.params.id)

   // var { date } = blogs
   // Date.format(date, "ddd, MMM DD YYYY", true)
   // console.log("api GET One Blog date is ", date)

   // console.log("blogs are ", blogs)

   res.json(blog)
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

router.delete("/delete/:id", auth, async (req, res) => {
   // console.log("api DELETE route passed auth")
   // console.log("api DELETE route req.params.id is", req.params.id)
   const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
   res.send(deletedBlog)
})

router.put("/edit", auth, async (req, res) => {
   // console.log("api EDIT route passed auth")
   // console.log("api EDIT route req.body is", req.body)

   try{
      var updateBlog = await Blog.findById(req.body._id)
      console.log("api EDIT updateBlog = await Blog.findById answer is", updateBlog)
      console.log("api EDIT res.errors is", res.errors)
      // console.log("api EDIT res is", res)
      updateBlog.hasComments = req.body.hasComments
      updateBlog.images = req.body.images
      updateBlog.text = req.body.text
      updateBlog.title = req.body.title
   
      const updatedBlog = await updateBlog.save()
   
      // const updatedBlog = await new Blog({
      //    _id,
      //    addedById,
      //    addedByUsername,
      //    images,
      //    text,
      //    title
      // })
   
      // updatedBlog = await Blog.findByIdAndUpdate(_id, updatedBlog)
      // updatedBlog = await blog.save()
   
      res.json(updatedBlog)
   } catch(err) {
      console.error("api EDIT err.message in catch block is", err.message)
      res.status(500).json({msg: err.message})
   }
})

module.exports = router