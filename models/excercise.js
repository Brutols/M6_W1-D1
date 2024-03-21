const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, {timestamps: true, strict: true});

module.exports = mongoose.model("exerciseModel", exerciseSchema, "cose");