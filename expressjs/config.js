'use strict';

const dotenv = require('dotenv');

const assert = require('assert');

const contants = require('./contants');

dotenv.config();

const { PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER, DOMAIN } = process.env;

const sqlEncrypt = process.env.ENCRYPT = true;

assert(PORT, "PORT is required");
assert(HOST, "HOST is required");

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        requestTimeout: 15000,
        options: {
            keepAlive: true,
            encrypt: sqlEncrypt,
            enableArithAbort: true,
            trustedConnection: true,
        }
    },
    domainFrontEnd: DOMAIN,
    token_secret: contants.TOKEN_SECRET
}