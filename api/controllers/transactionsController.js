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
  if (req.params.operation && parseInt(req.params.operation) != 0) arr_clausula.push(` t.operation=${req.params.operation} `)
  if (req.params.id_category && parseInt(req.params.id_category) > 0) arr_clausula.push(` t.id_category='${req.params.id_category}' `)
  if (req.params.id && parseInt(req.params.id) > 0) arr_clausula.push(` t.id='${req.params.id}' `)

  try {
    const conn = await pool.getConnection();
    let query_transactions = `SELECT 
        t.*,
        DATE_FORMAT(t.date,'%e/%b %H:%i') AS date_label,
        c.name as category_name
        FROM  transactions t
        LEFT JOIN categories c ON t.id_category=c.id
        WHERE t.id_user=${req.user.id} ${(arr_clausula.length > 0) ? " AND " + arr_clausula.join(" AND ") : ""}
		    GROUP BY  t.id
        ORDER BY t.date DESC`;
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

const monthResume = async (req, res) => {
  try {
        const conn = await pool.getConnection();
        let query_resume = `SELECT 
        MONTH(t.date) AS month,
        YEAR(t.date) AS year,
        SUM(IF(t.operation > 0 ,1 , 0)) as income_q,
        SUM(IF(t.operation < 0 ,1 , 0)) as expense_q, 
        SUM(IF(t.operation > 0 ,t.amount,0)) as income, 
        SUM(IF(t.operation < 0 ,t.amount,0)) as expenses,
        DATE_FORMAT(date, '%Y%m') as code 
        FROM transactions t  
        GROUP BY code
        ORDER BY t.date DESC`;
    const [rows, fields] = await conn.query(query_resume);
    conn.release();
    res.json({ err: false, resume: rows });
  } catch (err) {
    console.log(err);
    res.json({ err: true, message: err });
  }
}

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  delTransaction,
  monthResume
};