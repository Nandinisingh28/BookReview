const User = require('../models/userModel');

const registerUser = (req, res) => {
    const {name,email,password} = req.body;
    res.json({
        name,
        email
    });
}

module.exports = {registerUser};