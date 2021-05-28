'use strict';

const config = require('../../../config');
const { Account, Role, Verify, Profile, Image } = require('../../data');
const utils = require('../../utils/auth');

const signup = async (req, res, next) => {
    try {
        const { user_name, password, email, roles } = req.body;
        let account = { user_name, password, email };
        if (!password) {
            res.status(400).json({ message: 'Password is required' });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({ message: 'Password must be greater or equal than 8 characters' });
            return;
        }
        if (user_name.length < 8) {
            res.status(400).json({ message: 'Username must be greater or equal than 8 characters' });
            return;
        }
        account.password = utils.hashCode(password);
        const result = await Account.saveAccount(account);
        if (result[0].account_id) {
            roles.forEach(async (role_name) => {
                const role = await Role.findByRoleName(role_name);
                const saved = await Role.saveRoleAccount(role[0].role_id, result[0].account_id);
                if (saved.length == 0) {
                    res.status(400).json({ message: "Add role " + role_name + " failure!" });
                    return;
                }
            });
            res.status(200).json({ message: 'signup successfully' });
        } else {
            res.status(400).json({ message: "signup failure" });
        }

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}
const signin = async (req, res, next) => {
    let { user_name, password } = req.body;
    try {
        if (!password || !user_name) {
            res.status(400).json({ message: 'Thiếu thông tin tên tài khoản hoặc mật khẩu' });
            return;
        }
        let account = await Account.findByUserName(user_name);
        if (account.length > 0) {
            const passwordPassed = await utils.checkPassword(password, account[0].password);
            if (passwordPassed) {
                account[0].last_signin = new Date();
                account[0].status = 1;
                await Account.updateAccount(account[0]);
                res.status(200).send({ token: utils.generateAccessToken({ account_id: account[0].account_id, email: account[0].email, user_name: account[0].user_name, is_verify: account[0].is_verify, status: account[0].status }) });
            } else {
                res.status(400).json({ message: 'Mật khẩu không chính xác' });
                return;
            }
        } else {
            res.status(400).send({ message: 'Mật khẩu không chính xác' });
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const signout = async (req, res, next) => {
    let { account_id } = req.user;
    try {
        let account = await Account.findByAccountId(account_id);
        if (account.length > 0) {
            account = account[0];
            account.status = 0;
            await Account.updateAccount(account);
            res.status(200).send({ message: "Đăng xuất thành công" })
        } else {
            res.status(400).send({ message: 'Tài khoản không tòn tại' });
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const resetPassword = async (req, res, next) => {
    let { password, account_id } = req.body;

    try {
        if (!password) {
            res.status(400).json({ message: 'Yêu cầu thông tin mật khẩu' });
            return;
        }
        if (account_id) {
            const result = await Account.findByAccountId(account_id);
            if (result.length > 0) {
                password = utils.hashCode(password);
                await Account.updatePassword({ account_id, password });
                res.status(200).send({ success: 1, message: "Cập nhật mật khẩu thành công" })
            } else {
                return res.status(400).send({ success: 0, message: "Tài khoản không hợp lệ" });
            }
        } else {
            res.status(400).json({ success: 0, message: 'Tài khoản không hợp lệ' });
            return;
        }

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updatePassword = async (req, res, next) => {
    let { password } = req.body;
    const { account_id } = req.user;

    try {
        if (!password) {
            res.status(400).json({ success: 0, message: 'Yêu cầu thông tin mật khẩu' });
            return;
        }
        if (password.length < 8) {
            return res.status(400).json({ success: 0, message: 'Mật khẩu phải lớn hơn hoặc bằng 8 ký tự' });
        }
        let result = await Account.findByAccountId(account_id);
        if (result.length === 0)
            return res.status(400).json({ success: 0, message: 'Không tìm thấy người dùng' });
        else {
            result[0].password = utils.hashCode(password);
            await Account.updateAccount(result[0]);
            return res.status(200).json({ success: 1, message: 'Đổi mật khẩu thành công' });
        }

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const verifyAccount = async (req, res, next) => {
    const { code, user_name } = req.body;
    try {
        const account = await Account.findByUserName(user_name);
        if (account[0]) {
            const { account_id } = account[0];
            if (account[0].is_verify === 1) {
                return res.status(400).send({ message: "Tài khoản này đã được xác thực" });
            } else {
                const verify = await Verify.findByAccountId(account_id);
                if (verify[0].verify_id) {
                    if (code != verify[0].code) {
                        res.status(400).json({ message: 'Mã không khớp' });
                        return;
                    }
                    const isExpried = await Verify.isExpriedVerify(account_id);
                    if (!isExpried) {
                        res.status(400).json({ message: 'Mã đã hết hạn' });
                        return;
                    }
                    account[0].is_verify = 1;
                    await Account.updateAccount(account[0]);
                    res.status(200).send({ message: "success" })
                }
            }
        } else {
            res.status(400).send({ message: "Không tìm thấy tài khoản" });
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const getUserInfo = async (req, res, next) => {
    let { user } = req;
    try {
        let profile = await Profile.findByAccountId(user.account_id);
        const roles = await Role.findRoleByUserName(user.user_name);
        if (profile.length === 1) {
            if (profile[0].avatar) {
                let avatar = await Image.findById(profile[0].avatar);
                if (avatar.length === 1) {
                    avatar[0].url = config.url + "/public/images/" + avatar[0].name;
                    profile[0].avatar = avatar[0];
                }
            }
            if (profile[0].cover_image) {
                let cover_image = await Image.findById(profile[0].cover_image);
                if (cover_image.length === 1) {
                    cover_image[0].url = config.url + "/public/images/" + cover_image[0].name;
                    profile[0].cover_image = cover_image[0];
                }
            }
            user.profile = profile[0];
        } else {
            user.profile = {};
        }
        if (roles.length > 0) {
            user.roles = roles;
        } else {
            user.roles = [];
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}


const updateAccount = async (req, res, next) => {
    let { user } = req;
    let data = req.body;
    try {
        const result = await Account.findByAccountId(user.account_id);
        if (result.length === 1) {
            data = { ...result, ...data };
            await Account.updateAccount(data);
            res.status(200).send({ message: "Cập nhật tài khoản thành công" });
        }
        res.status(400).send({ message: "Cập nhật tài khoản thất bại" });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const existedEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const res = await Account.existedEmail(email);
        res.status(200).send({ result: res });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const existedUserName = async (req, res, next) => {
    const { user_name } = req.body;
    try {
        const res = await Account.existedUserName(user_name);
        res.status(200).send({ result: res });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    signup,
    signin,
    resetPassword,
    verifyAccount,
    getUserInfo,
    signout,
    updatePassword,
    updateAccount,
    existedEmail,
    existedUserName
}