const express = require('express')
const router = express.Router()
const validateProfile = require('../middleware/validateProfile')
const { verifyJWT } = require('../middleware/verifyJWT')

const profileController = require('../controllers/profileController')

router.get('/',verifyJWT, profileController.getInitial)
router.put('/',verifyJWT,validateProfile,profileController.updateProfile)

module.exports = router;