const moment = require('moment')
const { pool, poolDev } = require("../config/db");

const getTransactions = async (req, res) => {
  var arr_clausula = []
  if (req.params.from && req.params.to) {
    arr_clausula.push(` (t.date BETWEEN '${req.params.from} 00:00:00' AND '${req.params.to} 23:59:59') `)
  } else {
    if (req.params.from) {
      arr_clausula.push(` t.date>='${req.params.from} 00:00:00' `)
    } else if (req.params.to) {
      arr_clausula.push(` t.date<='${req.params.to} 23:59:59' `)
    }
  }

  if (req.params.id_category && parseInt(req.params.id_category) > 0) arr_clausula.push(` t.id_category='${req.params.id_category}' `)
  if (req.params.id && parseInt(req.params.id) > 0) arr_clausula.push(` t.id='${req.params.id}' `)

  try {
    const conn = await pool.getConnection();
    let query_transactions = `SELECT 
        transactions.*
        FROM  transactions t
        WHERE t.id_user=${req.user.id} ${(arr_clausula.length > 0) ? " AND " + arr_clausula.join(" AND ") : ""}
		    GROUP BY  t.date`;
    const [rows, fields] = await conn.query(query_transactions);
    conn.release();
    res.json({ err: false, transactions: rows });
  } catch (err) {
    console.log(err);
    res.json({ err: true, message: err });
  }
}

const addTransaction = async (req, res) => {
  try {
    const { 
      date,
      operation,
      id_category,
      description,
      amount 
    } = req.body

    if (!date || !operation || !id_category || !description || !amount) return res.status(400).json({ 'message': 'Dont send exspected variables.' });
    
    const conn = await pool.getConnection()
    const query = `INSERT INTO transactions 
          (id_user,date,operation,id_category,description,amount) 
          VALUES 
          (${req.user.id},'${date}','${operation}','${id_category}','${description}',${amount})`
    const [rows, fields] = await conn.query(query)
    conn.release()

    res.json({
      err: false, 
      transaction: {
        id: rows.insertId,
        date: date,
        operation: operation,
        id_category: id_category,
        description: description,
        amount: amount
      }
    })
  } catch (err) {
    console.log(err)
    res.json({ err: true, message: err })
  }
}

const updateTransaction = async (req, res) => {
  try {
    const { 
      date,
      operation,
      id_category,
      description,
      amount 
    } = req.body
    if (!date || !operation || !id_category || !description || !amount) return res.status(400).json({ 'message': 'Dont send exspected variables.' });
    
    const conn = await pool.getConnection()
    const query = `UPDATE transactions SET date='${date}',operation='${operation}',id_category='${id_category}',description='${description}',amount=${amount} WHERE id=${req.params.id} AND id_user=${req.user.id}`
    const [rows, fields] = await conn.query(query)
    conn.release()

    res.json({
      err: false, transaction: {
        id: req.params.id,
        date: date,
        operation: operation,
        id_category: id_category,
        description: description,
        amount: amount
      }
    })
  } catch (err) {
    console.log(err)
    res.json({ err: true, message: err })
  }
}

const delTransaction = async (req, res) => {
  try {
    const conn = await pool.getConnection()
    const query = `DELETE transactions WHERE id=${req.params.id} AND id_user=${req.user.id_user}`
    const [rows, fields] = await conn.query(query)
    conn.release()
    res.json({ err: false, transaction: req.params.id })
  } catch (err) {
    console.log(err)
    res.json({ err: true, message: err })
  }
}

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  delTransaction

};