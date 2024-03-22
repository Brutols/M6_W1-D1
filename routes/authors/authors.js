const express = require("express");
const router = express.Router();
const AuthorsModel = require("../../models/authors");
const { cloudUpload } = require("../../cloudinary/cloudinaryConfig")

router.get("/authors", async (req, res) => {
  try {
    const authors = await AuthorsModel.find();
    res.status(200).send(authors);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "internal server error",
    });
  }
});

router.get("/authors/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const author = await AuthorsModel.findById(id);

    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: "no author found with this id",
      });
    }

    res.status(200).send(author);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "internal server error",
    });
  }
});

router.post("/authors", async (req, res) => {
  const newAuthor = new AuthorsModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    avatar: req.body.avatar,
  });

  try {
    const authorToSave = await newAuthor.save();
    res.status(201).send({
      statusCode: 201,
      message: `author ${authorToSave.firstName} successfully created!`,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "internal server error",
    });
  }
});

router.post('/authors/uploadAvatar', cloudUpload.single('uploadImg'), async (req, res) => {
  try {
      res.status(200).json({ source: req.file.path })
  } catch (e) {
      console.log(e)
      res.status(500)
          .send({
              statusCode: 500,
              message: 'File Upload Error'
          })
  }
})

router.patch("/authors/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const author = await AuthorsModel.findById(id);
        if (!author) {
            return res.status(404).send({
                statusCode: 404,
                message: "no author found with this id"
            })
        }

        const updatedData = req.body;
        const options = {new: true}

        const result = await AuthorsModel.findByIdAndUpdate(id, updatedData, options);

        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
          });
    }
})

router.delete("/authors/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const author = await AuthorsModel.findByIdAndDelete(id);
        if (!author) {
            return res.status(404).send({
                statusCode: 404,
                message: "no author found with this id"
            })
        }
        res.status(200).send({
            statusCode: 200,
            message: `user ${author.firstName} ${author.lastName} correctly deleted!`
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "internal server error",
          });
    }
})

module.exports = router;
