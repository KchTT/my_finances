const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const validateProfile = require('../middleware/validateProfile')

router.get('/', profileController.getInitial)
router.put('/',validateProfile,profileController.updateProfile)

module.exports = router;