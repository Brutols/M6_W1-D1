const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: true,
    },
    lastName: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    avatar: {
        type: "string",
        required: false,
        default: "",
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model("authorModel", AuthorSchema, "authors")