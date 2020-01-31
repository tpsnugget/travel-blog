const express = require("express"),
   router = express.Router(),
   gravatar = require("gravatar"),
   { check, validationResult } = require("express-validator"),
   bcrypt = require("bcryptjs"),
   jwt = require("jsonwebtoken"),
   config = require("config")

const User = require("../../models/User")

const saltRounds = config.get("saltRounds")

// =============================================================================
// @route   POST api/users
// @desc    Test route
// @access  Public access
router.post("/", [
   check("username", "Name is required").not().isEmpty(),
   check("email", "Please include a valid email").isEmail(),
   check("password", "Please include a password with 6 or more characters").isLength({
      min: 6
   })
], async (req, res) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()){
      console.log("api user POST route validation errors are ", errors.array())
      return res.status(422).json({errors: errors.array()})
   }

   const { email, username, password } = req.body
   console.log("api users POST route user is ", req.body)

   try{
      let user = await User.findOne({email})

      console.log("api users POST route TRY Block is up Man!")
      console.log("api users POST route user will be false if user does not exist ", user)

      if(user){
         return res.status(400).json({ errors: [{ msg: "User already exists" }] })
      }

      const avatar = gravatar.url(email, {
         s: "200",
         r: "pg",
         d: "mm"
      })

      var salt = await bcrypt.genSaltSync(saltRounds)
      var hash = await bcrypt.hashSync(password, salt)

      user = new User({
         avatar,
         email,
         password: hash,
         // password: password,
         username
      })

      const newUser = await user.save()
      console.log("api users POST newUser = await user.save() is ", newUser)

         res.json({username: username})
   } catch(err){
      console.error(err.message)
      res.status(500).send("Server error")
   }
})
// =============================================================================
router.put("/", async (req, res) => {

   const { id } = req.body

   const userToUpdate = await User.findById({_id: id})
   userToUpdate.hasProfile = true
   const updatedUser = await userToUpdate.save()


   res.json(updatedUser)
})
// =============================================================================
router.put("/lastloggedindate", async (req, res) => {

   const { id, lastLoggedInDate, loggedInDate } = req.body

   const userToUpdate = await User.findById({_id: id})
   // console.log("api User update loggedInDate date is", loggedInDate)
   userToUpdate.lastLoggedInDate = loggedInDate

   // This now has a copy of the previous lastLoggedInDate should it ever be needed
   userToUpdate.loggedInDate = lastLoggedInDate

   const updatedUser = await userToUpdate.save({new: true})
   // console.log("api User update updatedUser is", updatedUser)

   res.json(updatedUser)
})
// =============================================================================
module.exports = router