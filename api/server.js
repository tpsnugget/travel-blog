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
app.use("/api/blogs", require("./routes/api/blogs"))
app.use("/api/users", require("./routes/api/users"))
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/comments", require("./routes/api/comments"))

app.get("/", (req, res) => {
   res.send("GET / is up Man!")
})

app.listen(PORT, () => {
   console.log(`Server started on PORT: ${PORT}`)
})