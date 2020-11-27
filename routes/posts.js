const expres = require('express');
const router = expres.Router();
const Post = require('../models/Post');

// Note: '/' is used instead of '/posts' since this module is called by using a middleware on '/posts'
// Get all posts
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (error) {
        res.json({message: error})
    }
});

// See further below, can also be done with an async
/* router.post('/', (req, res) => {
    // To get the json request, install package 'body-parser'
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    console.log('Test: ' + post);

    // This saves the post to the db (also online)
    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
    });
})*/

// Post new data/Post
router.post('/', async (req, res) => {
    // To get the json request, install package 'body-parser'
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });


    // This saves the post to the db (also online)
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(error) {
        res.json(error);
    }
})

// Get specific post
router.get('/:postId', async (req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        res.json({message: error});
    } 
});

// Delete post
router.delete('/:postId', async(req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        res.json(removedPost);
    } catch (error) {
        res.json({message: error})
    }
});

// Update post
router.patch('/:postId', async(req,res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: {title: req.body.title }}
        );

        res.json(updatedPost);
    } catch (error) {
        res.json({message: error});
    }
})

module.exports = router;