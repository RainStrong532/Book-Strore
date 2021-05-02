'use strict';

const ModelMulter = require('../models/image/ModelMulter');

const upload = ModelMulter.single("image");

const uploadImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
            return;
        }

        next();
    })
}

module.exports = uploadImage;