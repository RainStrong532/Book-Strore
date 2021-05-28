'use strict';

const {Image} = require('../../data');
const fs = require('fs');
const config = require('../../../config');


const upload = async (req, res, next) => {
    const path = req.file.path;
    try {
        const img = fs.readFileSync(path);
        const encode_image = img.toString('base64');
        let splitPath = path.split("\\");

        const finalImg = {
            name: splitPath[splitPath.length - 1],
            data: Buffer.from(encode_image, 'base64')
        };

        let result = await Image.saveImage(finalImg);
        result[0].url = config.url + "/public/images/" + result[0].name;
        res.status(200).send(result[0]);
    } catch (err) {
        try {
            fs.unlinkSync(path)
        } catch (e) {
            res.status(400).send({message: e.message});
        }
        res.status(400).send({message: err.message});
    }
}

const findByImageName = async (req, res, next) => {
    try {
        const name = req.params.name;
        if (name) {
            let result = await Image.findByImageName(name);
            result[0].url = config.url + "/public/images/" + result[0].name;
            res.status(200).send(result[0]);
        } else {
            res.status(404).send({ message: "Url không hợp lệ"});
        }
    } catch (err) {
        res.status(400).send({message: err.message});
    }
}

const findById = async (req, res, next) => {
    try {
        const image_id = req.params.image_id;
        if (image_id) {
            let result = await Image.findById(image_id);
            result[0].url = config.url + "/public/images/" + result[0].name;
            res.status(200).send(result[0]);
        } else {
            res.status(404).send({ message: "Url không hợp lệ"});
        }
    } catch (err) {
        res.status(400).send({message: err.message});
    }
}

module.exports = {
    upload,
    findByImageName,
    findById
}