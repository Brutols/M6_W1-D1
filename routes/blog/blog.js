const express = require("express");
const router = express.Router();
const blogModel = require("../../models/blog");

router.get("/blogPosts", async (req, res) => {
    const { page = 1, pageSize = 2 } = req.query

    try {
        const blogPosts = await blogModel.find()
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        res.status(200).send(blogPosts)
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

router.get("/blogPosts/:id", async (req, res) => {
    const { id } = req.params
    console.log(id);

    try {
    const post = await blogModel.findById(id);

    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "no post found with this id",
      });
    }

    res.status(200).send(post);
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

router.post("/blogPosts", async (req, res) => {
    const newBlogPost = new blogModel({
        category: req.body.category,
        title: req.body.title,
        cover: req.body.cover,
        readTime: req.body.readTime,
        author: req.body.author,
        content: req.body.content
    })

    try {
        const blogPostToSave = await newBlogPost.save();
        res.status(201).send({
            statusCode: 201,
            message: `Post ${blogPostToSave.title} saved successfully`
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

router.patch("/blogPosts/:id", async (req, res) => {
    const { id } = req.params

    try {
        const post = await blogModel.findById(id);
    
        if (!post) {
          return res.status(404).send({
            statusCode: 404,
            message: "no post found with this id",
          });
        }

        const updatedData = req.body
        const options = {new: true}

        const result = await blogModel.findByIdAndUpdate(id, updatedData, options)
    
        res.status(200).send(result);
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: "Internal server error"
            })
        }
})

router.delete("/blogPosts/:id", async (req, res) => {
    const { id } = req.params

    try {
        const post = await blogModel.findByIdAndDelete(id)
        if (!post) {
            return res.status(404).send({
                statusCode: 404,
                message: "no post found with this id"
            })
        }
        res.status(200).send({
            statusCode: 200,
            message: `Post with id: ${id} deleted`
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

module.exports = router;