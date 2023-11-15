const { Router } = require('express')
const cors = require("cors");
const router = Router()
require('dotenv').config();

const allowedOrigins = [process.env.ALLOWED_ORIGINS];

const register = function ({ server, managers }) {
    server.use(cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 200
    }));


    const faucetHandler = require('./handlers/faucet.js')({
        identityManager: managers.identityManager,
        faucetManager: managers.faucetManager
    });


    router.get('/credit', faucetHandler.getCreditForAddress);
    router.get('/balance', faucetHandler.getBalance);

    server.use('/', router);


    server.get('/', function (req, res) {
        res.send('OK');
    });

    server.get('*', function (req, res) {
        throw { status: 404, message: 'Not found' } // eslint-disable-line
    });
    server.post('*', function (req, res) {
        throw { status: 404, message: 'Not found' } // eslint-disable-line
    });
    server.use(function (err, req, res, next) {
        console.log(+new Date(), err);
        res.status(err.status || 404).json({
            error: true,
            status: err.status || 404,
            message: err.message
        });
    });
}
module.exports = register
