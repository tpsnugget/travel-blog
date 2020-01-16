const express = require("express"),
   router = express.Router()

// @route   GET api/posts
// @desc    Test route
// @access  Public access
router.get("/", (req, res) => {
   res.send("Post GET Route is up Man!")
})

module.exports = router