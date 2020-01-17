const express = require("express"),
   router = express.Router(),
   gravatar = require("gravatar"),
   { check, validationResult } = require("express-validator"),
   bcrypt = require("bcryptjs"),
   jwt = require("jsonwebtoken"),
   config = require("config"),
   auth = require("../../middleware/auth")

const User = require("../../models/User")

const saltRounds = config.get("saltRounds")

// @route   GET api/auth
// @desc    Test route
// @access  Public access
router.post("/", async (req, res) => {
   try {
      // console.log("api/auth GET req.body ", req.body)
      const user = await User.findOne({ "email": req.body.email })
      // console.log("user found in db: ", user)
      if(bcrypt.compareSync(req.body.password, user.password)){
         console.log("Passwords match!")
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
               console.log("token is: ", token)
               res.json({token})
            })
      }
      else{
         console.error(err.message)
         res.status(500).send("Server error")
      }
      // console.log("api/auth GET password received from React: ", req.body.password)

      // var salt = await bcrypt.genSaltSync(10)
      // console.log("password going into hash: ", req.body.password)
      // var hash = await bcrypt.hashSync(req.body.password, salt)

      // console.log("api/auth GET user db hashed password: ", user.password)
      // console.log("React hashed password: ", hash)

   } catch (err) {
      console.error(err.message)
      res.status(500).send("Server error")
   }
})

module.exports = router