
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const moment = require('moment')
const { pool, poolDev } = require("../config/db");
const { creaToken } = require('../utils')
require('dotenv').config();

const handleSignUp = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const { name, lastname, email, pass } = req.body
        const [rows_chk, fields_chk] = await conn.query(`SELECT * FROM users WHERE email='${email}'`);

        
        if (!pass || pass == "") {
            conn.release();
            res.status(400).json({ err:true, message: "Dont send your password" })
            return
        } else if(!email || email=="" || !validateEmailStructure(email)){
            conn.release();
            res.status(400).json({ err:true, message: "Dont send your email or its invalid" })
            return
        } else if (rows_chk.length > 0) {
            conn.release();
            res.status(400).json({ err:true, message: "This user already exist" })
            return
        } else {
            //let pass_new = crypto.createHash('sha512').update(pass).digest('hex')
            const [rows_user, fields_user] = await conn.query(`INSERT INTO users (email,pass,status) VALUES ('${email}','${pass}',1)`);
            const [rows_profile, fields_profile] = await conn.query(`INSERT INTO profile (id_user,name,lastname,month_limit) VALUES (${rows_user.insertId},'${name}','${lastname}',0)`);
            conn.release();
            res.json({ err: false, message: "Your user is ready! You can login now..." });
        }
    } catch (error) {
        console.log(error)
        res.json({ err: true, message: error.message });
    }
}

const handleSignIn = async (req, res) => {
    const { email, pass } = req.body
    if (!email || email=="" || !pass || pass=="") return res.status(400).json({ 'message': 'Username and password are required.' });
    if (email=="" || !validateEmailStructure(email)) return res.status(400).json({ 'message': 'Email is empty or invalid.' });

    try {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query(`SELECT 
        users.*,
        IFNULL(name, '') AS name,
        IFNULL(lastname, '') AS lastname
        FROM users 
        LEFT JOIN profile ON users.id = profile.id_user
        WHERE email='${email}'
        GROUP BY users.id`);

        if (rows.length < 1) return res.status(401).json({ err: true, message: "User not exist" });

        // evaluate password 
        console.log(pass, rows[0].pass)
        //const match = await bcrypt.compare(pass, rows[0].pass);
        //if (!match) return res.status(401).json({ err: true, message: "The password is incorrect" });

        let _user = {
            ui: rows[0].id,
            email: rows[0].email,
            name: rows[0].name,
            lastname: rows[0].lastname,
        };

        const token = creaToken(_user, 1, "days");
        const refresh = await conn.query(`UPDATE users SET last_login='${moment().format("YYYY-MM-DD HH:mm:ss")}' WHERE email='${email}'`);
        conn.release();
        //res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.header("X-Auth-Token", token).json({
            err: false,
            message: "Login Ok!",
            user: _user,
            t: token
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

const validateEmailStructure = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

module.exports = {
    handleSignUp,
    handleSignIn
};