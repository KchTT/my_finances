var mysql = require("mysql2/promise");
require('dotenv').config();

let host = process.env.STAT=="dev" ? process.env.M_HOST_DEV : process.env.M_HOST
let user = process.env.STAT=="dev" ? process.env.M_USER_DEV : process.env.M_USER

console.log(host,user)

let pool = mysql.createPool({
	host: host,
	user: user,
	password: process.env.M_PASS,
	database: process.env.M_DB,
});

module.exports={
	pool
}

