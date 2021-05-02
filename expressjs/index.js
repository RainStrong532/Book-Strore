'use strict';

const express = require('express');
const config = require('./config');
const cors = require('cors');

const app = express();

app.use(cors(config.domainFrontEnd));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));


const imageRouter = require('./src/routes/uploadRouter');

app.use('/api/images', imageRouter.routes);

app.listen(config.port, () => {
    console.log('Server is running on http://localhost:' + config.port);
});