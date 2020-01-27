const express = require("express"),
   router = express.Router(),
   auth = require("../../middleware/auth")

const Comment = require("../../models/Comment")

router.post("/", auth, async (req, res) => {
   // console.log("Comment api auth is valid")
   // console.log("Comment api req.body is", req.body)

   const { addedById, addedByUsername, blogId, commentText } = req.body

   try{
      const comment = await new Comment({
         addedById,
         addedByUsername,
         blogId,
         commentText
      })
   
      const newComment = await comment.save()
   
      res.json(newComment)
   } catch(err){
      console.log("comment api err is", err)
      res.json(err)
   }
})

router.get("/show/:id", async (req, res) => {
   console.log("comment api req.params.id is", req.params.id)
   const comments = await Comment.find({blogId: req.params.id})
   
   res.json(comments)
})

module.exports = router