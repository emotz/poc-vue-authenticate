import toastr from 'toastr';
import 'toastr.css';

/**
 * You probably want to use {@link Loader} instead of this.
 */
export function success(message) {
    toastr.success(message);
}

/**
 * You probably want to use {@link Loader} instead of this.
 */
export function error(message) {
    toastr.error(message);
}
