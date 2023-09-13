const express = require('express')
const router = express.Router()
const transaccioensController = require('../controllers/transaccioensController')

router.get('/:desde/:hasta/:id_categoria/:id', transaccioensController.getTransactions)

router.post('/', transaccioensController.addTransaction)

router.route('/:id')
  .put(transaccioensController.updateTransaction)
  .delete(transaccioensController.delTransaction)