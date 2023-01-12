const router = require('express').Router();
const Conversation = require('../models/Conversation');


// Create new conversation
router.post("/" ,async (req, res) => {
    const newConv = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try{
        const savedConv =  await newConv.save();
        res.status(200).json(savedConv);
    }catch(e){
        res.status(500).json(e);
    }
})


// get Conv of a user
router.get("/:userId" ,async (req, res) => {
 
    try{
        const conv = await Conversation.find({
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(conv);
    }catch(e){
        res.status(500).json(e);
    }
})

module.exports = router; 