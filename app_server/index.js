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
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const httpServer = http.createServer(app);
const HttpPort = process.env.HTTP_PORT || 2985

httpServer.listen(HttpPort, () => {
    console.log(`Web Escuchando en el puerto http > ${HttpPort} `);
});
