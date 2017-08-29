import { http } from './http';

import Vue from 'vue';
import VueAuthenticate from 'vue-authenticate';
import config from 'src/config';

Vue.use(VueAuthenticate, {
    // baseUrl: config.home_url,
    providers: {
        facebook: {
            clientId: config.app_id,
            redirectUri: `${config.home_url}/auth/callback`
        }
    },
});


http.interceptors.push(function (request, next) {
    const auth = Vue.prototype.$auth;
    if (auth.isAuthenticated()) {
        request.headers.set('Authorization', [
            auth.options.tokenType, auth.getToken()
        ].join(' '));
    }
    next();
});
