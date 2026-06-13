const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const noteRoutes = require("./routes/noteRoutes")

dotenv.config()

connectDB()

const app = express()


app.use(express.json())
app.use(cors())
app.use("/notes",noteRoutes)

app.get("/",(req,res) => {
    res.send("Server is running...")
})




const port = process.env.PORT
app.listen(port, () => {
  console.log("Server running on port "+port);
});