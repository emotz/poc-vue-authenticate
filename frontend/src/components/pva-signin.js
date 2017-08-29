import * as notify from 'src/services/notify';

export default {
    data() {
        return {
            isAuthenticated: this.$auth.isAuthenticated()
        };
    },
    methods: {
        async signin() {
            try {
                await this.$auth.authenticate('facebook');
            } catch (err) {
                notify.error("Not logged in");
                throw err;
            }
            this.isAuthenticated = true;
            notify.success("Logged in");
        },
        async signout() {
            try {
                await this.$auth.logout();
            } catch (err) {
                notify.error("Couldn't log out");
                throw err;
            }
            this.isAuthenticated = false;
            notify.success("Logged out");
        },
        async getprofile() {
            let response;
            try {
                response = await this.$http.get("/profile");
            } catch (err) {
                notify.error("Couldn't get profile");
                throw err;
            }
            notify.success("Got profile");
            console.log(response);
            const profile = response.body;
            alert(JSON.stringify(profile));
        }
    }
};
