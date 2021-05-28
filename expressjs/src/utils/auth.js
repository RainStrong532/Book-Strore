'use strict';

const confgi = require('../../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateAccessToken = function (user) {
    const exprieAfter = 60 * 60 * 24 * 7; //7 ngày
    return jwt.sign(user, confgi.token_secret, { expiresIn: exprieAfter });
}

const hashCode = function (password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const checkPassword = async function (password, hash) {
    try {
        const res = await bcrypt.compareSync(password, hash);
        return res;
    } catch (err) {
        throw err;
    }
}

const generateVerifyCode = (num) => {
    let code = "";
    for (let i = 0; i < num; i++) {
        let rand = Math.floor((Math.random() * 9));
        rand = rand.toString();
        code += rand;
    }
    return code;
}

const validateEmail = (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(phone) {
    const regex1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const regex2 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    return (regex1.test(phone) || regex2.test(phone));
  }
module.exports = {
    generateAccessToken,
    checkPassword,
    hashCode,
    generateVerifyCode,
    validateEmail,
    validatePhoneNumber
}