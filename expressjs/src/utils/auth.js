'use strict';

const confgi = require('../../config');
const jwt = require('jsonwebtoken');

const  generateAccessToken = function(user) {
    const exprieAfter = 60*60*24;
    return jwt.sign(user, confgi.token_secret, { expiresIn:  exprieAfter});
}
const bcrypt = require('bcrypt');

const hashCode = function(password){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const checkPassword = async function(password, hash){
    try{
    const res = await bcrypt.compareSync(password, hash);
    return res;
    }catch(err){
        throw err;
    }
}
module.exports = {
    generateAccessToken,
    checkPassword,
    hashCode
}