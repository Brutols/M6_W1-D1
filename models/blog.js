const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    category: {
        type: "string",
        required: true
    },
    title: {
        type: "string",
        required: true
    },
    cover: {
        type: "string",
        required: false,
        default: "http://placehold.it/600x400"
    },
    readTime: {
        value: {
            type: "number",
            required: false,
            default: 0
        },
        unit: {
            type: "string",
            required: false,
            default: "min"
        }
    },
    author: {
        name: {
            type: "string",
            required: true
        },
        avatar: {
            type: "string",
            required: false,
            default: "http://placehold.it/50x50"
        }
    },
    content: {
        type: "string",
        required: true
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model("blogModel", blogSchema, "blog")