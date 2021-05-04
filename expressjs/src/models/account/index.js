'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const existedUserName = (user_name) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('account');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request.input("user_name", sql.VarChar(100), user_name)
                    .query(sqlQueries.existedUserName).then(recordset => {
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

const existedEmail = (email) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('account');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request.input("email", sql.VarChar(80), email)
                    .query(sqlQueries.existedEmail).then(recordset => {
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

const saveAccount = (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('account');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("user_name", sql.VarChar(100), data.user_name)
                    .input("password", sql.VarChar(255), data.password)
                    .input("email", sql.VarChar(80), data.email)
                    .query(sqlQueries.saveAccount).then(recordset => {
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

const findByAccountId = (account_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('account');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("account_id", sql.Int, account_id)
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


const findByUserName = (user_name) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('account');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("user_name", sql.VarChar, user_name)
                    .query(sqlQueries.findByUserName).then(recordset => {
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

const findByEmail = (email) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('account');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("email", sql.VarChar, email)
                    .query(sqlQueries.findByEmail).then(recordset => {
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

const updatePassword = ({ account_id, password }) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('account');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("account_id", sql.Int, account_id)
                    .input("password", sql.VarChar, password)
                    .query(sqlQueries.updatePassword).then(recordset => {
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

const updateAccount = ({ account_id, is_verify, enable, status, last_signin }) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('account');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("account_id", sql.Int, account_id)
                    .input("enable", sql.Int, enable)
                    .input("status", sql.Int, status)
                    .input("is_verify", sql.Int, is_verify)
                    .input("last_signin", sql.DateTimeOffset, last_signin)
                    .query(sqlQueries.updateAccount).then(recordset => {
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
    existedUserName,
    existedEmail,
    saveAccount,
    findByAccountId,
    findByUserName,
    findByEmail,
    updatePassword,
    updateAccount
}