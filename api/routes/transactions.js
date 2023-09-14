const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactionsController')

router.get('/month_resume', transactionsController.monthResume)
router.get('/:from/:to/:operation/:id_category/:id?', transactionsController.getTransactions)

router.post('/', transactionsController.addTransaction)

router.route('/:id')
  .put(transactionsController.updateTransaction)
  .delete(transactionsController.delTransaction)

module.exports = router;