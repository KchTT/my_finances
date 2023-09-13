const express = require('express')
const app = express()
const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const { verifyJWT, verifyBelieverJWT } = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')

require('dotenv').config()

const HttpPort = process.env.HTTP_PORT || 7820

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(helmet())
app.use(morgan('tiny'))

app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/api/v1/auth', require('./routes/auth'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});
app.use(errorHandler);
const httpServer = http.createServer(app)
httpServer.listen(HttpPort, () => {
    console.log(`Listen http port > ${HttpPort} `)
})

module.exports = app
