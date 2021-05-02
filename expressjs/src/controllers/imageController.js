'use strict';

const Image = require('../models/image');
const fs = require('fs');
const config = require('../../config');


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

        const result = await Image.saveImage(finalImg);

        res.status(200).send(result);
    } catch (err) {
        try {
            fs.unlinkSync(path)
        } catch (err) {
            console.error(err)
        }
        res.status(400).send(err);
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
            res.status(400).send({ message: "Url is not valid"});
        }
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    upload,
    findByImageName
}