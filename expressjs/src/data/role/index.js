'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const findRoleByUserName = (userName) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('role');
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

const findRoleByAccountId = (account_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('role');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request.input("account_id", sql.Int, account_id)
                    .query(sqlQueries.findRoleByAccountId).then(recordset => {
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

const findByRoleName = (role_name) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('role');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request
                    .input("role_name", sql.VarChar, role_name)
                    .query(sqlQueries.findByRoleName).then(recordset => {
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

const saveRoleAccount = (role_id, account_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('role');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request
                    .input("role_id", sql.Int, role_id)
                    .input("account_id", sql.Int, account_id)
                    .query(sqlQueries.saveRoleAccount).then(recordset => {
                    pool.close();
                    resolve(recordset)
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
    findByRoleName,
    saveRoleAccount,
    findRoleByAccountId
}