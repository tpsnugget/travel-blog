const express = require("express"),
   router = express.Router()

// @route   GET api/users
// @desc    Test route
// @access  Public access
router.get("/", (req, res) => {
   res.send("User GET Route is up Man!")
})

module.exports = router