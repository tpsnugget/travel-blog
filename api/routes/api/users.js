const express = require("express"),
   router = express.Router(),
   gravatar = require("gravatar"),
   { check, validationResult } = require("express-validator"),
   bcrypt = require("bcryptjs"),
   jwt = require("jsonwebtoken"),
   config = require("config")

const User = require("../../models/User")

const saltRounds = config.get("saltRounds")

// @route   POST api/users
// @desc    Test route
// @access  Public access
router.post("/", [
   check("name", "Name is required").not().isEmpty(),
   check("email", "Please include a valid email").isEmail(),
   check("password", "Please include a password with 6 or more characters").isLength({
      min: 6
   })
], async (req, res) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()){
      return res.status(422).json({errors: errors.array()})
   }

   const { email, name, password } = req.body

   try{
      let user = await User.findOne({email})

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
         name
      })

      await user.save()

      const payload = {
         user: {
            id: user.id
         }
      }

      jwt.sign(
         payload, 
         config.get("jwtSecret"),
         {expiresIn: 3600},
         (err, token) => {
            if(err) throw err
            res.json({token, name})
         })
   } catch(err){
      console.error(err.message)
      res.status(500).send("Server error")
   }
})

router.put("/", async (req, res) => {

   const { id } = req.body

   console.log("api/user req.body.id is ", id)

   const userToUpdate = await User.findById({_id: id})
   userToUpdate.hasProfile = true
   await userToUpdate.save()


   res.send("User POST Route is up Man!")
})

module.exports = router