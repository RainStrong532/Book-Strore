const express = require('express');

const router = express.Router();
const appRouter = require("./app");
const authRouter = require("./auth");

router.use("/app", appRouter.routes);
router.use("/auth", authRouter.routes);

module.exports = {
    routes: router
};