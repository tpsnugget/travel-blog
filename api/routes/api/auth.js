const express = require("express"),
   router = express.Router(),
   gravatar = require("gravatar"),
   { check, validationResult } = require("express-validator"),
   bcrypt = require("bcryptjs"),
   jwt = require("jsonwebtoken"),
   config = require("config"),
   auth = require("../../middleware/auth")

const User = require("../../models/User")

// @route   GET api/auth
// @desc    Test route
// @access  Public access
router.get("/", async (req, res) => {
   try {
      const user = await User.findOne({ "email": req.query.email })
      const { id, name, password } = user
      if(bcrypt.compareSync(req.query.password, password)){
         // console.log("Passwords match!")
         const payload = {
            user: {
               id: id
            }
         }
   
         jwt.sign(
            payload, 
            config.get("jwtSecret"),
            {expiresIn: 3600},
            (err, token) => {
               if(err) throw err
               // console.log("token is: ", token)
               res.json({name, token})
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