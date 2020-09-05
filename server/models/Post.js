const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    created_at: { type: Date, default: Date.now }
})

postSchema.plugin(require('mongoose-autopopulate'));
const Post = mongoose.model('Post', postSchema)

module.exports = Post
