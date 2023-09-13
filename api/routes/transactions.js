const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactionsController')

router.get('/:desde/:hasta/:id_categoria/:id', transactionsController.getTransactions)

router.post('/', transactionsController.addTransaction)

router.route('/:id')
  .put(transactionsController.updateTransaction)
  .delete(transactionsController.delTransaction)

module.exports = router;