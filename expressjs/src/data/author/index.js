'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const findAll = async (pattern, orderBy, sortBy) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = `SELECT * FROM [author] WHERE [enable] = 1 AND [author_name] LIKE N'${pattern}' ORDER BY [${orderBy}] ${sortBy};`;
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                .input('keywords', sql.NVarChar, pattern)
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

const findById = async (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("author_id", sql.Int, id)
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

const findByBookId = async (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("book_id", sql.Int, id)
                    .query(sqlQueries.findByBookId).then(recordset => {
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

const deleteAuthor = async (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("author_id", sql.Int, id)
                    .query(sqlQueries.delete).then(recordset => {
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

const save = async (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("author_name", sql.NChar, data.author_name)
                    .input("description", sql.NChar, data.description)
                    .query(sqlQueries.saveAuthor).then(recordset => {
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

const update = async (data, author_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("author_name", sql.NChar, data.author_name)
                    .input("description", sql.NChar, data.description)
                    .input("enable", sql.Int, data.enable)
                    .input("author_id", sql.Int, author_id)
                    .query(sqlQueries.saveAuthor).then(recordset => {
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

const saveImage = async (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("author_id", sql.Int, data.author_id)
                    .input("image_id", sql.Int, data.image_id)
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

const findAllImages = async (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('author_id', sql.Int, id)
                    .query(sqlQueries.findImageById).then(recordset => {
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

const findImage = async (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('author_id', sql.Int, data.author_id)
                    .input('image_id', sql.Int, data.image_id)
                    .query(sqlQueries.findImage).then(recordset => {
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

const deleteImage = async (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('author_id', sql.Int, data.author_id)
                    .input('image_id', sql.Int, data.image_id)
                    .query(sqlQueries.deleteImage).then(recordset => {
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

const existedImage = async (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('author_id', sql.Int, data.author_id)
                    .input('image_id', sql.Int, data.image_id)
                    .query(sqlQueries.existedImage).then(recordset => {
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
    saveImage,
    findAllImages,
    findImage,
    deleteImage,
    existedImage,
    deleteAuthor,
    update,
    findByBookId
}