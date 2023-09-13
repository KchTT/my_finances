
const crypto = require('crypto')
const moment = require('moment')
const { pool, poolDev } = require("../config/db");
const { creaToken } = require('../utils')
require('dotenv').config();

const handleSignUp = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const { name, lastname, email, pass } = req.body
        const [rows_chk, fields_chk] = await conn.query(`SELECT * FROM users WHERE email='${email}'`);

        if (!pass || pass === "") {
            conn.release();
            res.json({ resp: 0, msj: "Dont send your password" })
            return
        } else if (rows_chk.length > 0) {
            conn.release();
            res.json({ resp: 0, msj: "This user already exist" })
            return
        } else {
            let pass_new = crypto.createHash('sha512').update(pass).digest('hex')
            const [rows, fields] = await conn.query(`INSERT INTO b_numbers (name,lastname,email,pass) VALUES ('${name}','${lastname}','${user}','${pass}')`);
            conn.release();
            res.json({ err: false, msj: "Your user is ready! You can login now..." });
        }
    } catch (error) {
        console.log(error)
        res.json({ err: true, msj: error.message });
    }
}

const handleSignIn = async (req, res) => {
    const { email, pass } = req.body
    if (!email || !pass) return res.status(400).json({ 'message': 'Username and password are required.' });

    try {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query(`SELECT * FROM users WHERE email='${email}'`);

        if (rows.length < 1) return res.status(401).json({ err: true, message: "User not exist" });

        /*
                if (rows.length > 0 && rows[0].active == 0) {
                    res.json({ err: true, message: "EL USUARIO NO ESTA ACTIVADO" });
                    return;
                }
                if (!rows || rows.length < 1) return res.sendStatus(401); //Unauthorized 
        */

        // evaluate password 
        const match = await bcrypt.compare(pass, row[0].pass);
        if (!match) return res.status(401).json({ err: true, message: "The password is incorrect" });

        let _user = {
            ui: rows[0].id,
            user: rows[0].email,
            name: rows[0].name,
            lastname: rows[0].lastname,
        };

        const token = creaToken(_user, 1, "days");
        const refresh = await conn.query(`UPDATE users SET last_login='${moment().format("YYYY-MM-DD HH:mm:ss")}' WHERE user='${user}'`);
        conn.release();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.header("X-Auth-Token", token).json({
            err: false,
            message: "SE LOGUEO CORRECTAMENTE",
            user: _user,
            t: token
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports = {
    handleSignUp,
    handleSignIn
};