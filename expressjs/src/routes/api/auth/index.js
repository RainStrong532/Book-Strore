const express = require('express');

const router = express.Router();

const profileRouter = require("./profileRouter");
const authRouter = require("./authRouter");

router.use("/profiles", profileRouter.routes);
router.use("/", authRouter.routes);

module.exports = {
    routes: router
};