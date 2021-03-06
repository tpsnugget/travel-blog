const express = require("express"),
   router = express.Router(),
   auth = require("../../middleware/auth")

   const Profile = require("../../models/Profile")

// @route   GET api/profile
// @desc    Test route
// @access  Public access
router.post("/", auth, async (req, res) => {

   const { bio, location, id } = req.body

   // console.log("api/profile req body, location and id are ", bio, location, id)

   profile = new Profile({
      bio,
      location,
      user: id
   })

   const newProfile = await profile.save()

   res.send(newProfile)
})

module.exports = router