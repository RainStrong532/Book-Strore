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
    let { contact } = req.body;
    let account_id = null, email = null;
    try {
        if (!contact) {
            return res.status(400).send({ message: "Username or email is required" });
        }
        let result = null;
        if (utils.auth.validateEmail(contact)) {
            result = await await Account.findByEmail(contact);
        } else {
            result = await await Account.findByUserName(contact);
        }
        if (result.length > 0) {
            email = result[0].email;
            account_id = result[0].account_id;
        } else {
            res.status(400).send({ message: "Tài khoản không tồn tại!" })
            return;
        }
        const code = utils.auth.generateVerifyCode(6);
        let expried_date = new Date().getTime() + defaultExpried;
        expried_date = new Date(expried_date);
        await Verify.updateVerify({ code, account_id, expried_date });
        const mailOptions = {
            to: email,
            subject: "Check your verify code [" + code + "]",
            html: "<p style='font-size: 24px'>Hello, <b>" + result[0].user_name + "!</b></p>\
            <p style='font-size: 20px'>Here your code <span style='text-decoration: underline; color: #344fa1; cursor: pointer;'>"+ code + "</span>.</p>"
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                res.status(400).send(error);
                return;
            } else {
                res.status(200).json({ message: "Sent", data: { email, account_id } });
                return;
            }
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
        return;
    }
}

const verifyEmail = async function (req, res) {
    const { code, account_id } = req.body;
    if (!code) {
        return res.status(400).json({ message: "Verify code is required", success: 0 });
    }
    try {
        const verify = await Verify.findByAccountId(account_id);
        if (code === verify[0].code) {
            res.status(200).send({ success: true })
        } else {
            res.status(400).send({
                success: 0,
                message: "Verify code is invalid"
            });
        }
    } catch (err) {
        res.status(400).json({
            success: 0,
            message: err.message
        });
    }
}


module.exports = {
    sendMailVerify,
    verifyEmail,
    sendMail
}