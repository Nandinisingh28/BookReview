const express = require('express');
const { registerUser } = require('../controllers/userController.js');
const router = express.Router();

router.route('/').post(registerUser);

module.exports = router;