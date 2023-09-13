const moment = require('moment')
const { pool, poolDev } = require("../config/db");

const getCategories = async (req, res) => {
    var arr_clausula = []
    if (req.params.from && req.params.to) {
        arr_clausula.push(` (t.date BETWEEN '${req.params.from}' AND '${req.params.to}') `)
    } else {
        if (req.params.from) {
            arr_clausula.push(` t.date>='${req.params.from}' `)
        } else if (req.params.to) {
            arr_clausula.push(` t.date<='${req.params.to}' `)
        }
    }

    if (req.params.id_category && parseInt(req.params.id_category)>0) arr_clausula.push(` t.id_category='${req.params.id_category}' `)
    if (req.params.id && parseInt(req.params.id)>0) arr_clausula.push(` t.id='${req.params.id}' `)

    try {
        const conn = await pool.getConnection();
        let query_transactions = `SELECT 
        id,nombre 
        FROM  transactions t
        WHERE mc.estado = 1 AND t.id_user=${req.user.id} ${(arr_clausula.length > 0) ? " AND " + arr_clausula.join(" AND ") : ""}
		GROUP BY  t.date`;
        
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
      const fecha_carga = moment().utcOffset(-6).format('YYYY-MM-DD HH:mm:ss')
      const query = `INSERT INTO transactions 
          (date,operation,id_category,description,amount) 
          VALUES 
          ('${req.body.date}','${req.body.operation}','${req.body.id_category}','${req.body.description}','${req.body.amount}')`
      const [rows, fields] = await conn.query(query)
      conn.release()
      res.json({ err: false, data: rows })
    } catch (err) {
      console.log(err)
      res.json({ err: true, message: err })
    }
  }
  
  const updateCategory = async (req, res) => {
    try {
      const conn = await pool.getConnection()
      const query = `UPDATE transactions SET date='${req.body.date}',operation='${req.body.operation}',id_category='${req.body.id_category}',description='${req.body.description}',amount=${req.body.amount} WHERE id=${req.params.id} AND id_user=${req.user.id}`
      const [rows, fields] = await conn.query(query)
      conn.release()
      res.json({ err: false })
    } catch (err) {
      console.log(err)
      res.json({ err: true, message: err })
    }
  }
  
  const delCategory = async (req, res) => {
    try {
      const conn = await pool.getConnection()
      const query = `DELETE transactions WHERE id=${req.params.id} AND id_user=${req.user.id_user}`
      const [rows, fields] = await conn.query(query)
      conn.release()
      res.json({ err: false, data: rows })
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