const express = require('express')
const Post = require('../models/Post')

const router = express.Router()

// Route to get all posts
router.get('/', (req, res, next) => {
    Post.find()
        .then(p => {
            res.json(p)
        })
        .catch(err => next(err))
})

// Route to add a Post
router.post('/', (req, res, next) => {
    let { text, author } = req.body
    Post.create({ text, author })
        .then(post => {
            res.json({
                success: true,
                post,
            })
        })
        .catch(err => next(err))
})

module.exports = router
