'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const saveMessage = ({ conversation_id, account_id, content, image_id, type }) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('message');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("conversation_id", sql.Int, conversation_id)
                    .input("account_id", sql.Int, account_id)
                    .input("image_id", sql.Int, image_id)
                    .input("content", sql.NVarChar, content)
                    .input("type", sql.Int, type)
                    .query(sqlQueries.saveMessage).then(recordset => {
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

const updateMessage = (message_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('message');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("message_id", sql.Int, message_id)
                    .query(sqlQueries.updateMessage).then(recordset => {
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

const deleteMessage = (message_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('message');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("message_id", sql.Int, message_id)
                    .query(sqlQueries.deleteMessage).then(recordset => {
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

const findAllByConversationId = ({ conversation_id, offset, limit}) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('message');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("conversation_id", sql.Int, conversation_id)
                    .input("offset", sql.Int, offset)
                    .input("limit", sql.Int, limit)
                    .query(sqlQueries.findAllByConversationId).then(recordset => {
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

const seenMessage = (message_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('message');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("message_id", sql.Int, message_id)
                    .query(sqlQueries.seenMessage).then(recordset => {
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
    saveMessage,
    updateMessage,
    deleteMessage,
    findAllByConversationId,
    seenMessage
}