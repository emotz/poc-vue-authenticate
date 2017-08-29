import NProgress from 'nprogress';
import 'nprogress.css';
import './progressbar.css';

let counter = 0;

export function start() {
    if (counter++ === 0) {
        NProgress.start();
    }
}

export function stop() {
    if (--counter === 0) {
        NProgress.done();
    }
}

export function wrap(fn, context, ...args) {
    start();
    const res = Promise.resolve(fn instanceof Function ? fn.apply(context, args) : fn);
    return res.then(val => {
        stop();
        return val;
    }, err => {
        stop();
        throw err;
    });
}
