const config = require('./config');
const log = require('./log')(module);
const express = require('express');
const path = require('path');

require('express-async-errors');

const DIST_PATH = path.resolve('../frontend/dist');

const app = express();

app.use(express.static(DIST_PATH));

if (config.isDev) {
    app.use(function (req, res, next) {
        log.debug("got request", req.originalUrl);
        next();
    });
}

app.get('*', function (req, res) {
    res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.use(function (err, req, res, next) {
    log.error("err", err);
    next(err);
});

app.listen(config.port, function () {
    log.info(`Express server listening on port ${config.port}`);
    return;
});
