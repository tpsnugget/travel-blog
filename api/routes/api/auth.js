const express = require("express"),
   router = express.Router(),
   gravatar = require("gravatar"),
   bcrypt = require("bcryptjs"),
   jwt = require("jsonwebtoken"),
   config = require("config"),
   auth = require("../../middleware/auth")

const User = require("../../models/User")

// @route   GET api/auth
// @desc    Test route
// @access  Public access
router.post("/", async (req, res) => {
   try {
      const user = await User.findOne({ "email": req.body.email })
      const { hasProfile, id, username, password } = user
      // console.log("api auth route hasProfile, id, username, password ", hasProfile, id, username, password)
      // console.log(password)
      // console.log(req.body.password)

      if(bcrypt.compareSync(req.body.password, password)){

      // if(req.body.password === password){
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
               // console.log("api auth route JWT hasProfile, id, username, password ", hasProfile, id, username, password)
               // console.log("api auth route JWT token ", token)
               res.json({ hasProfile, id, username, token })
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