const express = require('express')
const router = express.Router()
const validateTransaction = require('../middleware/validateTransaction')
const { verifyJWT } = require('../middleware/verifyJWT')
const transactionsController = require('../controllers/transactionsController')

router.get('/month_resume',verifyJWT, transactionsController.monthResume)
router.get('/:from/:to/:operation/:id_category/:id?',verifyJWT, transactionsController.getTransactions)

router.post('/',verifyJWT,validateTransaction, transactionsController.addTransaction)

router.route('/:id')
  .put(verifyJWT,validateTransaction,transactionsController.updateTransaction)
  .delete(verifyJWT,transactionsController.delTransaction)

module.exports = router;