var mysql = require("mysql2/promise");
require('dotenv').config();

console.log({
	host: process.env.STAT=="dev" ? process.env.M_HOST_DEV : process.env.M_HOST,
	user: process.env.STAT=="dev" ? process.env.M_USER_DEV : process.env.M_USER,
	password: process.env.STAT=="dev" ? process.env.M_PASS_DEV : process.env.M_PASS,
	database: process.env.STAT=="dev" ? process.env.M_DB_DEV : process.env.M_DB,
	port: process.env.STAT=="dev" ? process.env.M_PORT_DEV : process.env.M_PORT,
})

let pool = mysql.createPool({
	host: process.env.STAT=="dev" ? process.env.M_HOST_DEV : process.env.M_HOST,
	user: process.env.STAT=="dev" ? process.env.M_USER_DEV : process.env.M_USER,
	password: process.env.STAT=="dev" ? process.env.M_PASS_DEV : process.env.M_PASS,
	database: process.env.STAT=="dev" ? process.env.M_DB_DEV : process.env.M_DB,
	port: process.env.STAT=="dev" ? process.env.M_PORT_DEV : process.env.M_PORT,
});

module.exports={
	pool
}

