const { Profile } = require("../../models");
const utils = require("../../../src/utils");

const saveProfile = async (req, res, next) => {
    const {account_id} = req.user;
    try{
        const data = req.body;
        const result = await Profile.saveProfile({...data, account_id});
        if(result.length === 1){
            return res.status(200).send(result[0]);
        }
        res.status(400).send({message: "Create profile failure"});
    }catch(err){
        res.status(400).send({message: err.message});
    }
}

const updateProfile = async (req, res, next) => {
    const {account_id} = req.user;
    try{
        let data = req.body;
        const profiles = await Profile.findByAccountId(account_id);
        if(profiles.length > 0){
            data = {...profiles[0], ...data}
        }
        let {phone_number} = data;
        if(phone_number){
            if(!utils.auth.validatePhoneNumber(phone_number)){
                return res.status(400).send({message: "Phonenumber is invalid"})
            }
        }
        const result = await Profile.updateProfile({...data, account_id});
        res.status(200).send(result);
    }catch(err){
        res.status(400).send({message: err.message});
    }
}

const findAll = async (req, res, next) => {
    try{
        const result = await Profile.findAll();
        res.status(200).send(result);
    }catch(err){
        res.status(400).send({message: err.message});
    }
}

const findByAccountId = async (req, res, next) => {
    const {account_id} = req.user;
    try{
        const result = await Profile.findByAccountId(account_id);
        res.status(200).send(result);
    }catch(err){
        res.status(400).send({message: err.message});
    }
}

const findById = async (req, res, next) => {
    const {profile_id} = req.params;
    try{
        const result = await Profile.findById(profile_id);
        res.status(200).send(result);
    }catch(err){
        res.status(400).send({message: err.message});
    }
}

const updateAvatar = async (req, res, next) => {
    let {account_id} = req.user;
    let {image_id} = req.body;
    try{
        const result = await Profile.updateAvatar({account_id, image_id});
        res.status(200).send(result);
    }catch(err){
        res.status(400).send({message: err.message});
    }
}

const updateCoverImage = async (req, res, next) => {
    const {account_id} = req.user;
    const {image_id} = req.body;
    try{
        const result = await Profile.updateCoverImage({account_id, image_id});
        res.status(200).send(result);
    }catch(err){
        res.status(400).send({message: err.message});
    }
}
module.exports = {
    saveProfile,
    findAll,
    findByAccountId,
    findById,
    updateProfile,
    updateAvatar,
    updateCoverImage
}