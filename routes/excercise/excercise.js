const express = require("express")
const router = express.Router();
const exerciseModel = require("../../models/excercise")
// require('dotenv').config();
// const MongoClient = require('mongodb').MongoClient;

// const url = process.env.MONGODB_URL

// const createProduct = async (req, res, next) => {
//     console.log(req.body)
//     const newItem = {
//         isActive: true,
//         price: req.body.price,
//     };
//     const client = new MongoClient(url);
//     try {
//         await client.connect();
//         const db = client.db();
//         const result = await db.collection('excercise').insertOne(newItem);
//     } catch (error) {
//         return res.json({ message: 'Could not store data.' });
//     };
//     client.close();
//     res.json(newItem);
// };

// const getProducts = async (req, res, next) => {
//     const client = new MongoClient}

router.post("/exercise", async (req, res) => {
    const newItem = new exerciseModel({
        isActive: req.body.isActive,
        age: req.body.age
    })

    try {
        const itemToSave = await newItem.save();
        res.status(201).send({
            statusCode: 201,
            message: "item added successfully"
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error"
        })
    }
})

    module.exports = router