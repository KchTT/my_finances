const moment = require('moment')
const { pool, poolDev } = require("../config/db");

const getCategories = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    let query_transactions = `SELECT *
        FROM  categories 
		    GROUP BY  status, name, operation`;

    const [rows, fields] = await conn.query(query_transactions);
    conn.release();
    res.json({ err: false, transactions: rows });
  } catch (err) {
    console.log(err);
    res.json({ err: true, message: err });
  }
}

const addCategory = async (req, res) => {
  try {
    const conn = await pool.getConnection()
    // VALIDATE IF NAME EXIST IN DATABASE
    const query = `INSERT INTO categories 
          (operation,name ,status) 
          VALUES 
          ('${req.body.operation}','${req.body.name}',1)`
    const [rows, fields] = await conn.query(query)
    conn.release()
    res.json({
      err: false, category: {
        id: rows.insertId,
        operation: req.body.operation,
        name: req.body.name,
        status: 1
      }
    })
  } catch (err) {
    console.log(err)
    res.json({ err: true, message: err })
  }
}

const updateCategory = async (req, res) => {
  try {
    const conn = await pool.getConnection()
    // VALIDATE IF NAME EXIST IN DATABASE
    const query = `UPDATE categories SET operation=${req.body.operation},name='${req.body.name}',status=${req.body.status} WHERE id=${req.params.id} `
    const [rows, fields] = await conn.query(query)
    conn.release()
    res.json({
      err: false, category: {
        id: req.params.id,
        operation: req.body.operation,
        name: req.body.name,
        status: req.body.status
      }
    })
  } catch (err) {
    console.log(err)
    res.json({ err: true, message: err })
  }
}

const delCategory = async (req, res) => {
  try {
    const conn = await pool.getConnection()
    const query = `DELETE categories WHERE id=${req.params.id}`
    const [rows, fields] = await conn.query(query)
    conn.release()
    res.json({ err: false, id: req.params.id })
  } catch (err) {
    console.log(err)
    res.json({ err: true, message: err })
  }
}

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  delCategory
};