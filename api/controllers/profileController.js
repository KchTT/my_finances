const moment = require('moment')
const { pool, poolDev } = require("../config/db");

const getInitial = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    let query_profile = `SELECT *
        FROM  profile 
		    WHERE id_user = ${req.user.id}`;
    let query_categories = `SELECT *
        FROM  categories 
		    GROUP BY  status, name, operation`;

    const [rows_profile, fields_profile] = await conn.query(query_profile);
    const [rows_categories, fields_categories] = await conn.query(query_categories);
    conn.release();
    res.json({ err: false,profile:rows_profile[0], categories:rows_categories  });
  } catch (err) {
    console.log(err);
    res.json({ err: true, message: err });
  }
}

const updateProfile = async (req, res) => {
  try {
    const conn = await pool.getConnection()
    const query = `UPDATE profile SET lastname='${req.body.lastname}',name='${req.body.name}',month_limit=${req.body.month_limit} WHERE id_user=${req.user.id} `
    const [rows, fields] = await conn.query(query)
    conn.release()
    res.json({
      err: false, category: {
        id_user: req.params.id_user,
        lastname: req.body.lastname,
        name: req.body.name,
        month_limit: req.body.month_limit
      }
    })
  } catch (err) {
    console.log(err)
    res.json({ err: true, message: err })
  }
}

module.exports = {
  updateProfile,
  getInitial
};