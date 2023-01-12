const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { request } = require('express');


// Update User
router.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {

        // password update
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(e){
                return res.status(500).json(e);
            }
        }
        // Update the actual user
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json("User Aaccount is updated")
        } catch(e) {
            res.status(500).json(e);    
        }
    } else {
        return res.status(403).json("You can only update your own account");
    }
});


// Delete user
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {

        // Update the actual user
        try{
            const deleteUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User Aaccount has been deleted")
        } catch(e) {
            res.status(500).json(e);    
        }
    } else {
        return res.status(403).json("You can only Delete your own account");
    }
})

// Get a User

router.get("/", async(req, res) => {

    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById(userId): await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }catch(e) {
        res.json(e); 
    }
})

// Follow a user
router.put("/:id/follow", async(req, res) => {
    
    if(req.body.userId !== req.params.id){
        try{
            // find the user
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            // Check if you already follong the user
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: req.body.userId }});
                await currentUser.updateOne({$push: {followings : req.params.id}});
                res.status(200).json("You now follow the user");
            }else{
                res.status(403).json("You already follow this user")
            }
        }catch(e) {
            res.status(500).json("Failed");
        }
    }else{
        res.status(403).json("You cannot follow your self");
    }
})

// get friends 
router.get('/friends/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.json("User not found");
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)     
            })
        )
        if(!friends) return res.json("Failed to find friends")
        
        const friendList = [];
        friends.map((friend) => {
            const {_id, username, profilePicture} = friend
            friendList.push({_id, username, profilePicture});
        })
        res.status(200).json(friendList)
    }catch(e) {
        res.status(500).json(e);
    }
})

// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                await user.updateOne({$pull: {followers: req.body.userId}});
                res.status(200).json("Successfully onfollow the user");
            }else {
                res.status(403).json("you do not follow this user")
            }
        } catch(e){
            res.status(403).json(e);
        }
    } else {
        res.status(403).json("You cannot unfollow yourself");
    }
})

module.exports = router;