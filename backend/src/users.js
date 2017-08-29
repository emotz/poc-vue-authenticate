const users = {};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

module.exports = {
    addFacebookUser(facebook_access_token) {
        const my_access_token = guid();
        users[my_access_token] = facebook_access_token;
        return my_access_token;
    },
    getFacebookAccessToken(my_access_token) {
        return users[my_access_token];
    }
};
