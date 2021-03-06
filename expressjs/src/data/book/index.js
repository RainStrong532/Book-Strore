'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const findAll = (pattern, orderBy, sortBy) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = `SELECT * FROM [book]\
            WHERE [enable] = 1 AND\
            [book_name] LIKE N'${pattern}'\
            ORDER BY [${orderBy}] ${sortBy};`;
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
                    .input("book_name", sql.NVarChar, data.book_name)
                    .input("description", sql.NVarChar, data.description)
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

const update = async (data, book_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('book');
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

const saveAuthor = async (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("book_id", sql.Int, data.book_id)
                    .input("author_id", sql.Int, data.author_id)
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

const saveCategory = async (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("book_id", sql.Int, data.book_id)
                    .input("category_id", sql.Int, data.category_id)
                    .query(sqlQueries.saveCategory).then(recordset => {
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

const findOneImage = async (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('book_id', sql.Int, id)
                    .query(sqlQueries.findTopImage).then(recordset => {
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

const deleteCategory = async (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('book_id', sql.Int, data.book_id)
                    .input('category_id', sql.Int, data.category_id)
                    .query(sqlQueries.deleteCategory).then(recordset => {
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

const deleteAuthor = async (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('book');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('book_id', sql.Int, data.book_id)
                    .input('author_id', sql.Int, data.author_id)
                    .query(sqlQueries.deleteAuthor).then(recordset => {
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

const findByCategory = async (pattern, orderBy, sortBy, id) => {
    let pool = new sql.ConnectionPool(config.sql);
    let query = `USE[Book Store];\
    SELECT * FROM [book] WHERE [book_id]\
    IN\
        (\
            SELECT[book_id] FROM[category_book] WHERE[category_id] = @category_id\
        )\
        AND [enable] = 1 AND\
        [book_name] LIKE N'${pattern}'\
        ORDER BY [${orderBy}] ${sortBy};`
    return new Promise(async (resolve, reject) => {
        try {
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('category_id', sql.Int, id)
                    .query(query).then(recordset => {
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

const findByAuthor = async (pattern, orderBy, sortBy, id) => {
    let pool = new sql.ConnectionPool(config.sql);
    let query = `USE[Book Store];\
    SELECT * FROM [book] WHERE [book_id]\
    IN\
        (\
            SELECT[book_id] FROM[author_book] WHERE[author_id] = @author_id\
        )\
        AND [enable] = 1 AND\
        [book_name] LIKE N'${pattern}'\
        ORDER BY [${orderBy}] ${sortBy};`
    return new Promise(async (resolve, reject) => {
        try {
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input('author_id', sql.Int, id)
                    .query(query).then(recordset => {
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
    findByCategory,
    saveAuthor,
    saveCategory,
    deleteAuthor,
    deleteCategory,
    findOneImage
}