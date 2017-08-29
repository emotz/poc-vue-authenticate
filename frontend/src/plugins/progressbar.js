import { http } from './http.js';
import * as progressbar from 'src/services/progressbar.js';

http.interceptors.push(function (request, next) {
    progressbar.start();

    next(function (response) {
        progressbar.stop();
    });
});
