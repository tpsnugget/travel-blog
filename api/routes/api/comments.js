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
      console.log("comment api newComment is", newComment)
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

router.delete("/delete/:id", auth, async (req, res) => {
   console.log("api Comment DELETE id", req.params.id)
   const deletedComment = await Comment.findByIdAndDelete(req.params.id)
   res.send(deletedComment)
})

module.exports = router