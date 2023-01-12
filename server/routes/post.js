const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Create a post
router.post("/", async (req, res) => {
    // find the posting user
    const currentUser = await User.findById(req.body.userId);
    if(!currentUser) return res.status(404).json("User Not Found");
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(e){
        res.status(500).json(e);
    }
    
});

// Update a post
router.put("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(403).json("Post Not Found");
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Post updated");
        } else {
            res.status(403).json("You can only update your own post")
        }
    }catch(e){
        res.status(500).json(e)
    }
});
// Delete a post
router.delete("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(403).json("Post Not Found");
        if(post.userId === req.body.userId){
            await post.deleteOne({$set:req.body});
            res.status(200).json("Post Deleted");
        } else {
            res.status(403).json("You can only Delete your own post")
        }
    }catch(e){
        res.status(500).json(e)
    }
});

// Like, Dislike a post
router.put("/:id/like", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(403).json("Post Not Found");
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("You liked the post");
        } else {
           await post.updateOne({$pull: {likes: req.body.userId}});
           res.status(200).json("You disliked the post");
        }
    }catch(e){
        res.status(500).json(e)
    }
});

// get a post
router.get("/:id", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json("Post Not Found");
        const { updatedAt, ...others } = post._doc;
        res.status(200).json(others);
    }catch(e){
        res.status(500).json(e);
    }
})

// Get timeline posts
router.get("/timeline/:userId", async (req,res) => {
    
    try {
        const currentUser = await User.findById(req.params.userId);
        if(!currentUser) return res.status(404).json("User Not Found");
        const userPosts = await Post.find({userId: currentUser.id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    }catch(e){
        res.status(500).json(e)
    }
})

// Get user's all posts
router.get("/profile/:username", async (req,res) => {
    
    try {
        const user = await User.findOne({username: req.params.username});
        if(!user) console.log("User not found");
        const posts = await Post.find({userId: user._id} )
        res.status(200).json(posts);
    }catch(e){
        res.status(500).json(e)
    }
})

module.exports = router;