'use strict';

const { Account, Role, Verify, Profile } = require('../../models');
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
            res.status(400).json({ message: 'Lack of information' });
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
                res.status(400).json({ message: 'Login failed' });
                return;
            }
        } else {
            res.status(400).send({ message: 'Username or password incorrect' });
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
            res.status(200).send({ message: "Signout successfully" })
        } else {
            res.status(400).send({ message: 'Username not found' });
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const resetPassword = async (req, res, next) => {
    let { password, account_id, code } = req.body;

    try {
        if (!password) {
            res.status(400).json({ message: 'Password is required' });
            return;
        }
        if (!code) {
            res.status(400).json({ message: 'Code is required' });
            return;
        }
        const verify = await Verify.findByAccountId(account_id);
        if (verify[0].verify_id) {
            const isExpried = await Verify.isExpriedVerify(account_id);
            if (isExpried) {
                res.status(400).json({ message: 'The code has been expried' });
                return;
            }
            if (code != verify[0].code) {
                res.status(400).json({ message: 'The code is not matched' });
                return;
            }
            password = utils.hashCode(password);
            await Account.updatePassword({ account_id, password });
            res.status(200).send({ message: "Update password successfully" })
        } else {
            res.status(400).json({ message: 'Account id is not valid' });
            return;
        }

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const updatePassword = async (req, res, next) => {
    let { password } = req.body;
    const {account_id} = req.user;

    try {
        if (!password) {
            res.status(400).json({ message: 'Password is required' });
            return;
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be greater or equal than 8 characters' });
        }
        let result = await Account.findByAccountId(account_id);
        if(result.length === 0)
        return res.status(400).json({ message: 'User not found' });
        else{
            result[0].password = utils.hashCode(password);
            await Account.updateAccount(result[0]);
            return res.status(200).json({ message: 'Change password successfully' });
        }

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const verifyAccount = async (req, res, next) => {
    const { code } = req.body;
    const { account_id } = req.user;
    try {
        const account = await Account.findByAccountId(account_id);
        if (account[0]) {
            if (account[0].is_verify === 1) {
                return res.status(400).send({ message: "The account has not been verified" });
            } else {
                const verify = await Verify.findByAccountId(account_id);
                if (verify[0].verify_id) {
                    const isExpried = await Verify.isExpriedVerify(account_id);
                    if (!isExpried) {
                        res.status(400).json({ message: 'The code has been expried' });
                        return;
                    }
                    if (code != verify[0].code) {
                        res.status(400).json({ message: 'The code is not matched' });
                        return;
                    }
                    account[0].is_verify = 1;
                    await Account.updateAccount(account[0]);
                    res.status(200).send({ message: "Verify account successfully" })
                }
            }
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const getUserInfo = async (req, res, next) => {
    let { user } = req;
    try {
        const profile = await Profile.findByAccountId(user.account_id);
        const roles = await Role.findRoleByUserName(user.user_name);
        if (profile.length === 1) {
            user.profile = profile[0];
        }else{
            user.profile = {};
        }
        if(roles.length > 0){
            user.roles = roles;
        }else{
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
            data = {...result, ...data};
            await Account.updateAccount(data);
            res.status(200).send({message: "Update account successfully"});
        }
        res.status(400).send({ message: "Update account failure" });
    } catch (err) {
        res.status(400).send({ message: err.message });
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
    updateAccount
}