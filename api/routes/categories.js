const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categoriesController')

router.get('/', categoriesController.getCategories)

router.post('/', categoriesController.addCategory)

router.route('/:id')
  .put(categoriesController.updateCategory)
  .delete(categoriesController.delCategory)

module.exports = router;