const express = require("express"),
   app = express(),
   cors = require("cors"),
   mongoose = require("mongoose"),
   connectDB = require("./config/db")

const PORT = process.env.PORT || 9000

connectDB()

app.use(cors())
app.use(express.json({extended: false}))

app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/posts", require("./routes/api/posts"))
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/users", require("./routes/api/users"))

app.get("/", (req, res) => {
   res.send("GET / is up Man!")
})

app.listen(PORT, () => {
   console.log(`Server started on PORT: ${PORT}`)
})