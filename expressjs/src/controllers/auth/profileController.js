const { Profile, Account, Role, Image } = require("../../data");
const utils = require("../../../src/utils");
const config = require("../../../config");

const saveProfile = async (req, res, next) => {
    const { account_id } = req.user;
    try {
        const data = req.body;
        const result = await Profile.saveProfile({ ...data, account_id });
        if (result.length === 1) {
            return res.status(200).send(result[0]);
        }
        res.status(400).send({ message: "Create profile failure" });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const updateProfile = async (req, res, next) => {
    const { account_id } = req.user;
    try {
        let data = req.body;
        const profiles = await Profile.findByAccountId(account_id);
        if (profiles.length > 0) {
            data = { ...profiles[0], ...data }
        }
        let { phone_number } = data;
        if (phone_number) {
            if (!utils.auth.validatePhoneNumber(phone_number)) {
                return res.status(400).send({ message: "Phonenumber is invalid" })
            }
        }
        const result = await Profile.updateProfile({ ...data, account_id });
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const findAll = async (req, res, next) => {
    try {
        const result = await Profile.findAll();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const findByAccountId = async (req, res, next) => {
    const { account_id } = req.user;
    try {
        const result = await Profile.findByAccountId(account_id);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const findUserByAccountId = async (req, res, next) => {
    let { account_id } = req.params;
    let user = {};
    try {
        let users = await Account.findByAccountId(account_id);
        if(!users[0]){
            return res.status(400).send({message: "User is not existed"})
        }
        user = {...users[0]};
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

const findById = async (req, res, next) => {
    const { profile_id } = req.params;
    try {
        const result = await Profile.findById(profile_id);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const updateAvatar = async (req, res, next) => {
    let { account_id } = req.user;
    let { image_id } = req.body;
    try {
        const result = await Profile.updateAvatar({ account_id, image_id });
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const updateCoverImage = async (req, res, next) => {
    const { account_id } = req.user;
    const { image_id } = req.body;
    try {
        const result = await Profile.updateCoverImage({ account_id, image_id });
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const deleteAvatar = async (req, res, next) => {
    let { account_id } = req.user;
    try {
        const result = await Profile.updateAvatar({ account_id, image_id: null });
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const deleteCoverImage = async (req, res, next) => {
    const { account_id } = req.user;
    try {
        const result = await Profile.updateCoverImage({ account_id, image_id: null });
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}
module.exports = {
    saveProfile,
    findAll,
    findByAccountId,
    findById,
    updateProfile,
    updateAvatar,
    updateCoverImage,
    deleteAvatar,
    deleteCoverImage,
    findUserByAccountId
}