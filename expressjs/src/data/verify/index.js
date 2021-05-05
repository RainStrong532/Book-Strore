'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const existedVerify = (account_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('verify');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request.input("account_id", sql.Int, account_id)
                    .query(sqlQueries.existedVerify).then(recordset => {
                    pool.close();
                    resolve(recordset.recordset.length === 1)
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

const findByAccountId = (account_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('verify');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request.input("account_id", sql.Int, account_id)
                    .query(sqlQueries.findByAccountId).then(recordset => {
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

const saveVerify = ({account_id, code, expried_date}) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('verify');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request
                    .input("code", sql.Int, code)
                    .input("account_id", sql.Int, account_id)
                    .input("expried_date", sql.DateTimeOffset, expried_date)
                    .query(sqlQueries.saveVerify).then(recordset => {
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

const updateVerify = ({account_id, code, expried_date}) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('verify');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request
                    .input("code", sql.Int, code)
                    .input("account_id", sql.Int, account_id)
                    .input("expried_date", sql.DateTimeOffset, expried_date)
                    .query(sqlQueries.updateVerify).then(recordset => {
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

const isExpriedVerify = (account_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('verify');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request
                    .input("account_id", sql.Int, account_id)
                    .query(sqlQueries.isExpriedVerify).then(recordset => {
                    pool.close();
                    resolve(recordset.recordset.length === 1)
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
    existedVerify,
    findByAccountId,
    saveVerify,
    updateVerify,
    isExpriedVerify
}