const moment = require("moment");
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const creaToken = (user, tiempo, periodo) => {
    console.log(user)
    const payload = {
        id: user.ui,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        sub: crypto.createHash("md5").update(user.email).digest("hex"),
        iat: moment().unix(),
        exp: moment().add(tiempo, periodo).unix(),
    };
    console.log(payload)
    var token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    return token;
};

const seteaCifra = (sigla, cifra) => {
    return (cifra >= 0) ? sigla + " " + new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(cifra.toFixed(2)) : sigla + " " + new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(cifra.toFixed(2))
}

module.exports = {
    creaToken,
    seteaCifra
}