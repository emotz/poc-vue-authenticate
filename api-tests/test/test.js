const assert = require('assert');
const axios = require('axios');
const config = require('../src/config');
const log = require('../src/log')(module);

describe('REST', function () {
    this.timeout(10000);

    let data = undefined;

    before(async function () {
        data = await prepareFacebook();
    });

    after(async function () {
        await cleanupFacebook(data);
    })

    it('should pass', async function () {
        assert(true);
    });

    it('should get user profile', async function () {
        await getUserProfile(config.base_url, data.user.id, data.user.access_token);
    });

    it('should exchange short-lived token with long-lived token', async function () {
        await exchangeShortToken(config.base_url, config.app_id, config.app_secret, data.user.access_token);
    });
});

async function prepareFacebook() {
    const app_access_token = await getAppAccessToken(config.base_url, config.app_id, config.app_secret);
    const user = await createTestUser(config.base_url, config.app_id, app_access_token);

    return {
        app_access_token,
        user
    };
}

async function cleanupFacebook(data) {
    const id = data.user.id;
    const access_token = data.user.access_token;
    await deleteTestUser(config.base_url, id, access_token);
}

function getAppAccessToken(base_url, app_id, app_secret) {
    return axios({
        method: "get",
        url: `${base_url}/oauth/access_token`,
        params: {
            client_id: app_id,
            client_secret: app_secret,
            grant_type: "client_credentials"
        }
    }).then(function (response) {
        log.debug("got app access token", response.data);
        return response.data.access_token;
    }).catch(function (err) {
        log.error("not got app access token", err.response.data);
        throw err;
    });
}

function createTestUser(base_url, app_id, access_token) {
    return axios({
        method: "post",
        url: `${base_url}/v2.10/${app_id}/accounts/test-users`,
        data: {
            installed: true
        },
        params: {
            access_token: access_token
        }
    }).then(function (response) {
        log.debug("created user", response.data);
        return response.data;
    }).catch(function (err) {
        log.error("not created user", err.response.data);
        throw err;
    });
}

function deleteTestUser(base_url, user_id, access_token) {
    return axios({
        method: "delete",
        url: `${base_url}/v2.10/${user_id}`,
        params: {
            access_token
        }
    }).then(function (response) {
        log.debug("deleted user", response.data);
        return response.data;
    }).catch(function (err) {
        log.error("not deleted user", err.response.data);
        throw err;
    })
}

function getUserProfile(base_url, user_id, access_token) {
    return axios({
        method: "get",
        url: `${base_url}/v2.10/${user_id}`,
        params: {
            access_token
        }
    }).then(function (response) {
        log.debug("got user profile", response.data);
        return response.data;
    }).catch(function (err) {
        log.error("not got user profile", err.response.data);
        throw err;
    });
}

function exchangeShortToken(base_url, app_id, app_secret, short_token) {
    return axios({
        method: "get",
        url: `${base_url}/oauth/access_token`,
        params: {
            grant_type: "fb_exchange_token",
            client_id: app_id,
            client_secret: app_secret,
            fb_exchange_token: short_token
        }
    }).then(function (response) {
        log.debug("exchanged short token", response.data);
        return response.data;
    }).catch(function (err) {
        log.error("not exchanged short token", err.response.data);
        throw err;
    });
}
