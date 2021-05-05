'use strict';

const { Account, Conversation, Message, Role } = require('../../data');
const { ROLES } = require('../../../contants');

const saveConversation = async (req, res, next) => {
    let { user_id } = req.body;
    if (!user_id) user_id = req.user.account_id;
    try {
        if (user_id) {
            const users = await Account.findByAccountId(user_id);
            if (users.length > 0) {
                const roles = await Role.findRoleByUserName(users[0].user_name);
                if (roles.length === 1 && roles[0].role_name === ROLES.USER) {
                    await Conversation.saveConversation({ user_id });
                    return res.status(200).send({ message: "Create conversation successfully" })
                } else {
                    return res.status(400).send({ message: "Need account has only User role" })
                }
            } else {
                return res.status(400).send({ message: "User not found" });
            }
        } else {
            return res.status(400).send({ message: "user_id is required" });
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const saveMessage = async (req, res, next) => {
    try {
        const data = req.body;
        data.account_id = req.user.account_id;
        data.conversation_id = req.user.account_id;
        if (data.content) data.type = 0;
        else if (data.image_id) data.type = 1;
        else data.type = 3;
        if(data.type !== 1) data.image_id = null;

        const result = await Message.saveMessage(data);
        return res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const findAll = async (req, res, next) => {
    const user_id = req.user.account_id;
    try {
        const results = await Message.findAllByConversationId(user_id);
        return res.status(200).send(results);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}
module.exports = {
    saveConversation,
    saveMessage,
    findAll
}