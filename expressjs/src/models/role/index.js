'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const findRoleByUserName = (userName) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('image');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request.input("user_name", sql.VarChar(100), userName)
                    .query(sqlQueries.findRoleByUserName).then(recordset => {
                    pool.close();
                    resolve(recordset.recordset)
                }).catch(err => {
                    pool.close();
                    reject(err);
                })
            }).catch(err => {
                reject(err);
            })
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
}

module.exports = {
    findRoleByUserName,
}