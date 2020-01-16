const express = require("express"),
   router = express.Router()

// @route   GET api/profile
// @desc    Test route
// @access  Public access
router.get("/", (req, res) => {
   res.send("Profile GET Route is up Man!")
})

module.exports = router