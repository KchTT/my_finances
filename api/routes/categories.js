const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categoriesController')
const validateCategory = require('../middleware/validateCategory')
router.get('/', categoriesController.getCategories)

router.post('/',validateCategory, categoriesController.addCategory)

router.route('/:id')
  .put(validateCategory, categoriesController.updateCategory)
  .delete(categoriesController.delCategory)

module.exports = router;