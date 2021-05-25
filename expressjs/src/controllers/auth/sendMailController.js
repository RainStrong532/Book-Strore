'use strict';

const { Account, Verify } = require('../../data');
const mailInfo = require('../../../private');
const utils = require('../../utils');
const nodemailer = require("nodemailer");

const defaultExpried = 1000 * 60 * 2; // 2 minutes

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: mailInfo.EMAIL,
        pass: mailInfo.MAIL_PASSWORD,
    }
});

const sendMailVerify = async (req, res, next) => {
    const { user_name } = req.body;
    try {
        const account = await Account.findByUserName(user_name);
        if (account.length === 0) {
            return res.status(400).json({ message: "Account not found" });
        }
        const { is_verify, email, account_id } = account[0];
        if (is_verify === 1) {
            return res.status(400).json({ message: "Your account has been verified" });
        }
        const code = utils.auth.generateVerifyCode(6);
        const isExisted = await Verify.existedVerify(account_id);
        let expried_date = new Date().getTime() + defaultExpried;
        expried_date = new Date(expried_date);
        if (isExisted) {
            await Verify.updateVerify({ code, account_id, expried_date });
        } else {
            await Verify.saveVerify({ code, account_id, expried_date });
        }
        const mailOptions = {
            to: email,
            subject: "Confirm your email [" + code + "]",
            html: "<p style='font-size: 24px'>Hello, <b>" + user_name + "!</b></p>\
            <p style='font-size: 20px'>Here your code <span style='text-decoration: underline; color: #344fa1; cursor: pointer;'>"+ code + "</span>. It's will be expried soon!</p>"
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(200).json({ message: "Sent" });
            }
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const sendMail = async (req, res, next) => {
    let { user_name, email } = req.body;
    let account_id = null;
    try {
        if (!user_name && !email) {
            return res.status(400).send({ message: "Username or email is required" });
        }
        if (user_name) {
            let result = await Account.findByUserName(user_name);
            if (result.length > 0) {
                email = result[0].email;
                account_id = result[0].account_id;
            }
        }
        if(email && account_id === null){
            if (!utils.auth.validateEmail(email)) {
                return res.status(400).send({ message: "Email is not valid" });
            }
            let result = await Account.findByEmail(email);
            if (result.length > 0) {
                account_id = result[0].account_id;
                user_name = result[0].user_name;
            }
        }
        if(!account_id){
            res.status(400).send({message: "User not found"})
        }
        const code = utils.auth.generateVerifyCode(6);
        let expried_date = new Date().getTime() + defaultExpried;
        expried_date = new Date(expried_date);
        await Verify.updateVerify({ code, account_id, expried_date });
        const mailOptions = {
            to: email,
            subject: "Check your verify code [" + code + "]",
            html: "<p style='font-size: 24px'>Hello, <b>" + user_name + "!</b></p>\
            <p style='font-size: 20px'>Here your code <span style='text-decoration: underline; color: #344fa1; cursor: pointer;'>"+ code + "</span>.</p>"
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(200).json({ message: "Sent", account_id});
            }
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const verifyEmail = async function (req, res) {
    const { code, account_id } = req.body;
    if (!code) {
        return res.status(400).json({ message: "Verify code is required" });
    }
    try {
        const verify = await Verify.findByAccountId(account_id);
        if (code === verify[0].code) {
            res.status(200).send({ message: "Account has been verified" })
        } else {
            res.status(400).json({ message: "Verify code is invalid" });
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    sendMailVerify,
    verifyEmail,
    sendMail
}