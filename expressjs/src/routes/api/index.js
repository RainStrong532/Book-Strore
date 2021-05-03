const express = require('express');

const router = express.Router();
const appRouter = require("./app");

router.use("/app", appRouter.routes);

module.exports = {
    routes: router
};