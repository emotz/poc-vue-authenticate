import Vue from 'vue';
import App from 'src/components/pva-app.vue';

window.$ = window.jQuery = require('jquery');

// import all files from `plugins` directory
const req = require.context('./plugins/', true, /\.js$/);
req.keys().forEach(req);

$(function () {
    new Vue(App).$mount("#app");

    $("#splash").fadeOut(500);

    if (process.env.NODE_ENV !== 'production') {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://localhost:35729/livereload.js";
        document.body.appendChild(script);
    }
});
