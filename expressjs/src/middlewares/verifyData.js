const {Account} = require('../data');
const { ROLES } = require('../../contants');

const checkDuplicateUsername = async (req, res, next) => {
    const user_name = req.body.user_name;
    if (!user_name) {
        res.status(400).json({ message: 'Yêu cầu tên tài khoản'});
        return;
    }
    try {
        const isExisted = await Account.existedUserName(user_name);
        if (isExisted) {
            res.status(200).json({ message: "Tên tài khoản đã tồn tại" });
            return;
        } else {
            next();
        }
    } catch (err) {
        res.status(400).json(err);
        return;
    }
};

const checkRolesExisted = (req, res, next) => {
    let roles = req.body.roles;

    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!ROLES[roles[i]]) {
                res.status(400).json({
                    message: "Thất bại! " + roles[i] + " không tồn tại"
                });
                return;
            }
        }
    }else{
        roles = [ROLES.USER];
        req.body.roles = [ROLES.USER];
    }
    next();
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const checkMail = async (req, res, next) => {
    const email = req.body.email;
    if (!email) {
        res.status(400).json({ message: 'Yêu cầu Email' });
        return;
    }
    if(!validateEmail(email)){
        res.status(400).json({ message: 'Email không hợp lệ' });
        return;
    }
    try {
        const isExisted = await Account.existedEmail(email);
        if (isExisted) {
            res.status(200).json({ message: "Email đã tòn tại"});
            return;
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
        return;
    }
};

const verifySignUp = {
    checkDuplicateUsername,
    checkRolesExisted,
    checkMail
};

module.exports = verifySignUp;