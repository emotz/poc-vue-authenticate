const config = require('./config');
const log = require('./log')(module);
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const users = require('./users');

require('express-async-errors');

const DIST_PATH = path.resolve('../frontend/dist');

const app = express();

app.use(express.static(DIST_PATH));
app.use(bodyParser.json());

if (config.isDev) {
    app.use(function (req, res, next) {
        log.debug("got request", req.originalUrl);
        next();
    });
}

app.get('/profile', async function (req, res) {
    log.debug("got profile request");
    log.debug("req params", req.params);
    log.debug("req headers", req.headers);
    log.debug("req body", req.body);

    const my_access_token = req.get("Authorization").split(' ')[1];
    log.debug("my_access_token", my_access_token);
    const facebook_access_token = users.getFacebookAccessToken(my_access_token);
    log.debug("facebook_access_token", facebook_access_token);

    let response;
    try {
        response = await axios({
            method: "get",
            url: `${config.base_url}/v2.10/me`,
            params: {
                access_token: facebook_access_token
            }
        });
    } catch (err) {
        log.error("err", err.response.data);
        throw err;
    }

    const profile = response.data;
    log.debug("profile", profile);

    res.status(200);
    res.send(profile);
});

app.get('/auth/callback', function (req, res) {
    // this is a callback that we get from facebook
    log.debug("/auth/callback", req.body);
    res.status(200);
    res.send();
});

app.post('/auth/facebook', async function (req, res) {
    // this is a callback that we get from client browser
    log.debug("got authentication", req.body);

    const redirect_uri = req.body.redirectUri;
    const code = req.body.code;

    let response_access_token;
    try {
        response_access_token = await axios({
            method: "get",
            url: `${config.base_url}/v2.10/oauth/access_token`,
            params: {
                client_id: config.app_id,
                redirect_uri: redirect_uri,
                client_secret: config.app_secret,
                code: code
            }
        });
    } catch (err) {
        log.error("err", err.response.data);
        throw err;
    }
    log.debug("got response_access_token", response_access_token.data);
    const facebook_access_token = response_access_token.data.access_token;
    const my_access_token = users.addFacebookUser(facebook_access_token);

    res.status(200);
    res.send({
        access_token: my_access_token
    });
});

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
