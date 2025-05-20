const express = require("express")
const recordRoutes = express.Router()
const dbo = require("../db/conn")
const ObjectId = require("mongodb").ObjectId

// ✅ GET all records
recordRoutes.route("/").get(async (req, res) => {
    const db_connect = dbo.getDb()
    try {
        const result = await db_connect.collection("records").find({}).toArray()
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

// ✅ GET record by ID
recordRoutes.route("/:id").get(async (req, res) => {
    const db_connect = dbo.getDb()
    const myquery = { _id: new ObjectId(req.params.id) }
    try {
        const result = await db_connect.collection("records").findOne(myquery)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

// ✅ POST new record
recordRoutes.route("/add").post(async (req, res) => {
    const db_connect = dbo.getDb()
    const myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
    }
    try {
        const result = await db_connect.collection("records").insertOne(myobj)
        console.log("1 document created")
        res.status(201).json(result)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})

// ✅ POST update existing record
recordRoutes.route("/update/:id").post(async (req, res) => {
    const db_connect = dbo.getDb()
    const myquery = { _id: new ObjectId(req.params.id) }
    const newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    }
    try {
        const result = await db_connect.collection("records").updateOne(myquery, newvalues)
        console.log("1 document updated")
        res.status(200).json(result)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})

// ✅ DELETE a record by ID
recordRoutes.route("/:id").delete(async (req, res) => {
    const db_connect = dbo.getDb()
    const myquery = { _id: new ObjectId(req.params.id) }
    try {
        const result = await db_connect.collection("records").deleteOne(myquery)
        console.log("1 document deleted")
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

module.exports = recordRoutes
