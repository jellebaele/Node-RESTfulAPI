// https://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose');

// Create model / scheme
const PostsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// variables: name and schema
module.exports = mongoose.model('Posts', PostsSchema);