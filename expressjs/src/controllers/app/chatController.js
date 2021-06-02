'use strict';

const { Account, Conversation, Message, Role, Image } = require('../../data');
const { ROLES } = require('../../../contants');
const config = require('../../../config');

const saveConversation = async (req, res, next) => {
    let { user_id } = req.body;
    if (!user_id) user_id = req.user.account_id;
    user_id = parseInt(user_id);
    try {
        if (user_id) {
            const users = await Account.findByAccountId(user_id);
            if (users.length > 0) {
                const roles = await Role.findRoleByUserName(users[0].user_name);
                if (roles.length === 1 && roles[0].role_name === ROLES.USER) {
                    await Conversation.saveConversation(user_id);
                    return res.status(200).send({ status: 1, message: "Tạo cuộc hội thoại thành công" })
                } else {
                    return res.status(400).send({ status: 0, message: "Không thể tạo cuộc hội thoại giữa 2 admin" })
                }
            } else {
                return res.status(404).send({ status: 0, message: "Không tìm thấy người dùng" });
            }
        } else {
            return res.status(400).send({ status: 0, message: "Yêu câu mã người dùng" });
        }
    } catch (err) {
        res.status(400).send({ status: 0, message: err.message });
    }
}

const getConversationById = async (req, res, next) => {
    console.log("get by id");
    const conversation_id = req.params.conversation_id;
    try {
        const result = await Conversation.findById(conversation_id);
        if (result[0]) {
            res.status(200).send({ status: 1, data: result[0] });
        } else if (result.length === 0) {
            res.status(200).send({ status: 1, message: "Chưa có cuộc hội thoại" })
        } else {
            res.status(400).send({ status: 0 })
        }
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ success: 0, message: err.message });
    }
}

const deleteConversation = async (req, res, next) => {
    const conversation_id = req.user.account_id;
    try {
        await Conversation.deleteConversation(conversation_id);

        res.status(200).send({ status: 1 });

    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const saveMessage = async (req, res, next) => {
    try {
        const data = req.body;
        data.account_id = req.user.account_id;
        data.conversation_id = req.user.account_id;

        if (data.type === null || data.type === undefined) {
            return res.status(400).send({ success: 0, message: "Phải có loại tín nhắn" })
        }
        const result = await Message.saveMessage(data);
        return res.status(200).send({ success: 1, data: result });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const deleteMessage = async (req, res, next) => {
    const message_id = req.params.message_id;

    try {
        await Message.deleteMessage(message_id);
        res.status(200).send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const findMesssages = async (req, res, next) => {
    const conversation_id = req.params.conversation_id;
    let page_size = req.query.page_size || 10;
    let page_number = req.query.page_number || 0;
    try {
        const results = await Message.findAllByConversationId({ conversation_id: conversation_id, offset: page_number * page_size, limit: page_size });
        for (let i = 0; i < results.length; i++) {
            if (results[i].avatar) {
                let avatar = await Image.findById(results[i].avatar);
                if (avatar.length === 1) {
                    results[i].avatar = { url: config.url + "/public/images/" + avatar[0].name };
                }
            }

            if (results[i].image_id) {
                let img = await Image.findById(results[i].image_id);
                if (img.length === 1) {
                    results[i].image_url = config.url + "/public/images/" + avatar[0].name;
                }
            }
        }
        return res.status(200).send({ success: 1, data: results });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}
module.exports = {
    saveConversation,
    saveMessage,
    findMesssages,
    getConversationById,
    deleteConversation,
    deleteMessage
}