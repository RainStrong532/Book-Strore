const express = require('express');

const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter.routes);

module.exports = {
    routes: router
};