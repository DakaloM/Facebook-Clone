const router = require('express').Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');


// Add
router.post("/", async (req, res) => {

    const newMessage = new Message(req.body);    
    try {
       
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(e) {
        res.status(500).json(e);
    }
})

//Get
router.get("/:conversationId", async (req, res) => {
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json(messages);
    }catch(e) {
        res.status(500).json(e);
    }
})

module.exports = router;