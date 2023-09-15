const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categoriesController')
const { verifyJWT } = require('../middleware/verifyJWT')
const validateCategory = require('../middleware/validateCategory')

router.get('/',verifyJWT, categoriesController.getCategories)

router.post('/',verifyJWT,validateCategory, categoriesController.addCategory)

router.route('/:id')
  .put(verifyJWT,validateCategory, categoriesController.updateCategory)
  .delete(verifyJWT,categoriesController.delCategory)

module.exports = router;