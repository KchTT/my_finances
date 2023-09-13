const express = require("express");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");
const https = require('https')
const http = require('http');
const fs = require("fs")
const app = express();

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


if (process.env.VERSION == 'production') {
    const key = path.join(__dirname, '..', 'certs', 'airnizer-key.pen')
    const cert = path.join(__dirname, '..', 'certs', 'airnizer-cert.pem')
    const ca5 = path.join(__dirname, '..', 'certs', '473444_intermedio-sectigo.crt')

    const HttpsPort = process.env.HTTP_PORT || 2986

    const httpsServer = https.createServer({
        key: fs.readFileSync(key),
        cert: fs.readFileSync(cert),
        ca: fs.readFileSync(ca5)
    }, app)

    httpsServer.listen(HttpsPort, () => {
        console.log(`Web Escuchando en el puerto https > ${HttpsPort} `);
    });

} else {
    const httpServer = http.createServer(app);
    const HttpPort = process.env.HTTP_PORT || 2985

    httpServer.listen(HttpPort, () => {
        console.log(`Web Escuchando en el puerto http > ${HttpPort} `);
    });
} 