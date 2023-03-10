const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register new user
router.post('/register', async (req, res) => {
    
    try {

        // Encrypt password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });
    
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(e) {
        res.status(500).json(e)
    }
     
})

// Login
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("User not found");

        const validPass = await bcrypt.compare(req.body.password, user.password);
        !validPass && res.status(400).json("Passwords do not match");

        res.status(200).json(user);
    }catch(e) {
        res.status(500);
    }
})

module.exports = router;