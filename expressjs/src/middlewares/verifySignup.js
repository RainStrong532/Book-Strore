const User = require('../data/account');
const { ROLES } = require('../../contants');

checkDuplicateUsername = async (req, res, next) => {
    // Username
    const username = req.body.username;
    if (!username) {
        res.status(400).json({ message: 'Thiếu tên tài khoản' });
        return;
    }
    try {
        const isExisted = await User.existedUser(req.body.username);
        if (isExisted) {
            res.status(200).json({ message: "Tài khoản đã tồn tại" });
            return;
        } else {
            next();
        }
    } catch (err) {
        res.status(400).json(err);
        return;
    }
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES[req.body.roles[i]]) {
                res.status(400).json({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }else{
        res.status(400).json({
            message: "Role is required!"
        });
        return;
    }
    next();
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
checkMail = async (req, res, next) => {
    const email = req.body.email;
    if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
    }
    if(!validateEmail(email)){
        res.status(400).json({ message: 'Email is not valid' });
        return;
    }
    try {
        const isExisted = await User.existedEmail(email);
        if (isExisted) {
            res.status(200).json({ message: "Email was existed"});
            return;
        } else {
            next();
        }
    } catch (err) {
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