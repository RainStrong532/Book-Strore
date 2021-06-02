'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const saveConversation = (user_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('conversation');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("conversation_id", sql.Int, user_id)
                    .query(sqlQueries.saveConversation).then(recordset => {
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

const findById = (user_id) => {
    console.log(user_id);
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('conversation');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                
                request
                    .input("conversation_id", sql.Int, user_id)
                    .query(sqlQueries.findById).then(recordset => {
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

const deleteConversation = (user_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('conversation');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                
                request
                    .input("conversation_id", sql.Int, user_id)
                    .query(sqlQueries.deleteConversation).then(recordset => {
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
    saveConversation,
    findById,
    deleteConversation
}