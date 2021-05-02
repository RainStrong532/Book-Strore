'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const saveImage = (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('image');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request.input("name", sql.VarChar(255), data.name)
                    .query(sqlQueries.saveImage).then(recordset => {
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

const findByImageName = (name) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('image');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                    request.input("name", sql.VarChar(255), name)
                    .query(sqlQueries.findByImageName).then(recordset => {
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
    saveImage,
    findByImageName
}