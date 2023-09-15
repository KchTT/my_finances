const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT')
const authController = require('../controllers/authController');

router.post('/sign_in', authController.handleSignIn);
router.post('/sign_up', authController.handleSignUp);
router.post('/chk_token', verifyJWT, authController.chkToken);
module.exports = router;