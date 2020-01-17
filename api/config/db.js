const mongoose = require("mongoose"),
   config = require("config"),
   db = config.get("mongoURI")

const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
}

const connectDB = async () => {
   try {
      await mongoose.connect(db, options)
      console.log("MongoDB Connected...")
   } catch(err){
      console.error(err.message)
      process.exit(1)
   }
}

module.exports = connectDB