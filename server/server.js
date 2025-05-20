require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// ✅ Prefix routes with /record
app.use("/record", require("./routes/record"))

const dbo = require("./db/conn")

app.get("/", function(req, res) {
    res.send("App is running")
})

dbo.connectToMongoDB(function (error) {
    if (error) throw error

    app.listen(port, () => {
        console.log("Server is running on port: " + port)
    })
})
