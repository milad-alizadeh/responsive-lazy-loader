import './style.scss';
import LazyLoader from '../../src/js';
import Prism from 'prismjs';
import '../../node_modules/prismjs/themes/prism-tomorrow.css';
import '../../node_modules/prismjs/components/prism-javascript.js';
import '../../node_modules/prismjs/components/prism-markup.min.js';
import '../../node_modules/prismjs/components/prism-scss.js';

Prism.highlightAll();

let codeTags = [].slice.call(document.querySelectorAll('.c-code'));

codeTags.forEach(codeTag => {
    let code = codeTag.innerHTML;
    code = code.replace('<!--', '');
    code = code.replace('-->', '');
    code = code.trim();
    let language = codeTag.getAttribute('data-language');
    codeTag.classList.add('language-' + language);
    code = Prism.highlight(code, Prism.languages[language]);
    codeTag.innerHTML = code;
});

new LazyLoader({
    callback(el) {
        el.classList.add('c-image--loaded');
    }
});
