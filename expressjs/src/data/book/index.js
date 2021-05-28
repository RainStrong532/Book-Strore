'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const findAll = (pattern, orderBy, sortBy) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = `SELECT * FROM [book] WHERE [enable] = 1 AND [book_name] LIKE '${pattern}' ORDER BY [${orderBy}] ${sortBy};`;
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
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                .input("book_id", sql.Int, id)
                    .query(sqlQueries.findByBookId).then(recordset => {
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

const saveBook = (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                .input("book_name", sql.Nvarchar(255), data.book_name)
                .input("description", sql.Nvarchar(1000), data.description)
                .input("price", sql.Float, data.price)
                .input("discount", sql.Float, data.discount)
                .input("quantity", sql.BigInt, data.quantity)
                .input("publish_year", sql.Int, data.publish_year)
                    .query(sqlQueries.saveBook).then(recordset => {
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

const deleteBook = async (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("book_id", sql.Int, id)
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

const update = async (data, book_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('author');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("book_name", sql.NChar, data.book_name)
                    .input("description", sql.NChar, data.description)
                    .input("quantity", sql.Int, data.quantity)
                    .input("price", sql.Float, data.price)
                    .input("discount", sql.Float, data.discount)
                    .input("enable", sql.Int, data.enable)
                    .input("publish_year", sql.Int, data.publish_year)
                    .input("book_id", sql.Int, book_id)
                    .query(sqlQueries.saveBook).then(recordset => {
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
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("book_id", sql.Int, data.book_id)
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
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('book_id', sql.Int, id)
                    .query(sqlQueries.findImages).then(recordset => {
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
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('book_id', sql.Int, data.book_id)
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
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('book_id', sql.Int, data.book_id)
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
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('book_id', sql.Int, data.book_id)
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

const findByCategory = async (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('category_id', sql.Int, id)
                    .query(sqlQueries.findByCategory).then(recordset => {
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

const findByAuthor = async (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('author_id', sql.Int, id)
                    .query(sqlQueries.findByAuthor).then(recordset => {
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
    saveBook,
    saveImage,
    findAllImages,
    findImage,
    deleteImage,
    existedImage,
    deleteBook,
    update,
    findByAuthor,
    findByCategory
}