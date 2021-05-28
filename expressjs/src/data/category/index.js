'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const findAll = (pattern, orderBy, sortBy) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = `SELECT * FROM [category] WHERE [enable] = 1 AND [category_name] LIKE '${pattern}' ORDER BY [${orderBy}] ${sortBy};`;
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .query(sqlQueries).then(recordset => {
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

const findById = (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('category');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                .input("category_id", sql.Int, id)
                    .query(sqlQueries.findById).then(recordset => {
                        pool.close();
                        resolve(recordset.recordset[0])
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

const save = (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('category');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("category_name", sql.NChar, data.category_name)
                    .input("description", sql.NChar, data.description)
                    .input("parent_id", sql.Int, data.parent_id)
                    .query(sqlQueries.save).then(recordset => {
                        pool.close();
                        resolve(recordset.recordset[0])
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

const update = (data, category_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('category');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("category_name", sql.NChar, data.category_name)
                    .input("description", sql.NChar, data.description)
                    .input("parent_id", sql.Int, data.parent_id)
                    .input("category_id", sql.Int, category_id)
                    .input("enable", sql.Int, data.enable)
                    .query(sqlQueries.update).then(recordset => {
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

const deleteCategory = (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('category');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                .input("category_id", sql.Int, id)
                    .query(sqlQueries.delete).then(recordset => {
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


const findByParentId = (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('category');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                .input("parent_id", sql.Int, id)
                    .query(sqlQueries.findByParentId).then(recordset => {
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

const updateParentId = (category_id, parent_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('category');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                .input("category_id", sql.Int, category_id)
                .input("parent_id", sql.Int, parent_id)
                    .query(sqlQueries.findByParentId).then(recordset => {
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
    findAll,
    findById,
    save,
    update,
    deleteCategory,
    findByParentId,
    updateParentId
}