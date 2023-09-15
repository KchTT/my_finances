const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactionsController')
const validateTransaction = require('../middleware/validateTransaction')

router.get('/month_resume', transactionsController.monthResume)
router.get('/:from/:to/:operation/:id_category/:id?', transactionsController.getTransactions)

router.post('/',validateTransaction, transactionsController.addTransaction)

router.route('/:id')
  .put(validateTransaction,transactionsController.updateTransaction)
  .delete(transactionsController.delTransaction)

module.exports = router;