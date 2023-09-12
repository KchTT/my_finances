const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/sign_in', authController.handleSignIn);
router.post('/sign_up', authController.handleSignUp);

module.exports = router;