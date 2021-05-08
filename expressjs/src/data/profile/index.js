'use strict';

const utils = require('../../utils/loadSqlQuries');
const config = require('../../../config');
const sql = require('mssql');

const findById = (profile_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('profile');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request.input("profile_id", sql.Int, profile_id)
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

const findByAccountId = (account_id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('profile');
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

const findAll = () => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('profile');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .query(sqlQueries.findAll).then(recordset => {
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

const saveProfile = ({ account_id, firstname, lastname, description, dob, gender, address, phone_number }) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('profile');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("firstname", sql.NVarChar, firstname)
                    .input("lastname", sql.NVarChar, lastname)
                    .input("description", sql.NVarChar, description)
                    .input("dob", sql.DateTime, dob)
                    .input("gender", sql.Int, gender)
                    .input("address", sql.NVarChar, address)
                    .input("phone_number", sql.NVarChar, phone_number)
                    .input("account_id", sql.Int, account_id)
                    .query(sqlQueries.saveProfile).then(recordset => {
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

const updateProfile = ({ account_id, firstname, lastname, description, dob, gender, address, phone_number }) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('profile');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("firstname", sql.NVarChar, firstname)
                    .input("lastname", sql.NVarChar, lastname)
                    .input("description", sql.NVarChar, description)
                    .input("dob", sql.DateTime, dob)
                    .input("gender", sql.Int, gender)
                    .input("address", sql.NVarChar, address)
                    .input("phone_number", sql.NVarChar, phone_number)
                    .input("account_id", sql.Int, account_id)
                    .query(sqlQueries.updateProfile).then(recordset => {
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

const updateAvatar = ({ account_id, image_id }) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('profile');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("avatar", sql.Int, image_id)
                    .input("account_id", sql.Int, account_id)
                    .query(sqlQueries.updateAvartar).then(recordset => {
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

const updateCoverImage = ({ account_id, image_id }) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise(async (resolve, reject) => {
        try {
            const sqlQueries = await utils.loadSqlQueries('profile');
            pool.connect().then(() => {
                const request = new sql.Request(pool);
                request
                    .input("cover_image", sql.Int, image_id)
                    .input("account_id", sql.Int, account_id)
                    .query(sqlQueries.updateCoverImage).then(recordset => {
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
    findByAccountId,
    saveProfile,
    updateProfile,
    updateCoverImage,
    updateAvatar,
    findAll,
    findById
}