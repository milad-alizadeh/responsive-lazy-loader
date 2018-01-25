import './style.scss';
import LazyLoader from '../src/js';

new LazyLoader({
    callback(el) {
        el.classList.add('loaded');
    }
});
