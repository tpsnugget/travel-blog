const jwt = require("jsonwebtoken"),
   config = require("config")



module.exports = function(req, res, next){
   const token = req.header("x-auth-token")
   // console.log("middleware token is ", token)
   if(!token){
      return res.status(401).json({ msg: "No token, authorization denied" })
   }

   try{
      const decoded = jwt.verify(token, config.get("jwtSecret"))
      // console.log("middleware decoded.user is ", decoded.user)
      req.user = decoded.user
      next()
   } catch(err){
      res.status(401).json({ msg: "Token is not valid" })
   }
}