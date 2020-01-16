const express = require("express"),
   router = express.Router()

// @route   GET api/auth
// @desc    Test route
// @access  Public access
router.get("/", (req, res) => {
   res.send("Auth GET Route is up Man!")
})

module.exports = router