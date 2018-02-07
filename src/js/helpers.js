export default {
    /**
     * return a collection of nodes as an array
     * @return {[type]} [description]
     */
    getNodes(selector, root = document) {
        return [].slice.call(root.querySelectorAll(selector));
    },

    /**
     * get node offsetY
     * @param {DOMNode} node
     */
    getNodeOffsetY(node) {
        let scrollTop = this.getScrollTop();
        let elemRect = node.getBoundingClientRect();
        return elemRect.top + scrollTop;
    },

    /**
     * Find a node siblings with a specific class name
     * @param {DOMElement} el - A fiven DOM node
     * @param {String} className - Siblings class name
     * @return {Array} - An array of DOM nodes
     */
    getSiblings(el) {
        return [].filter.call(el.parentNode.children, (child) => {
            return child !== el && child.nodeType === 1;
        });
    },

    /**
     * Get scroll top
     * @return {int}
     */
    getScrollTop() {
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },

    /**
     * Window height
     * @return {int}
     */
    getWindowHeight() {
        return window.innerHeight || document.documentElement.clientHeight;
    },

    /**
     * Remove an item from the array
     * @param  {any} item
     * @param  {Array} array
     * @return {Array} modified array
     */
    removeItemFromArray(array, item) {
        let i = array.indexOf(item);

        if (i > -1) {
            array.splice(i, 1);
        }

        return array;
    },

    /**
     * Check if the parent of a node is a picture tag
     * @param  {DOMElement} dataNode
     * @return {Boolean}
     */
    isInPictureTag(dataNode) {
        return dataNode.parentNode.nodeName === 'PICTURE';
    },

    /**
     * The hit area of where we load images
     * @param  {INT} threshold - how much of an offset do we want the image to have before it starts loading
     * @return {INT}
     */
    loadingArea(threshold) {
        let wh = this.getWindowHeight();
        let scrollTop = this.getScrollTop();
        let min = scrollTop - wh - (wh * (threshold / 100));
        let max = scrollTop + wh + (wh * (threshold / 100));

        return {
            min: min > 0 ? min : 0,
            max
        };
    },

    /**
     * Debounce Function
     * @param  {Function} func
     * @param  {Int} wait
     * @return {Function}
     */
    debounce(func, wait) {
        let timeout;
        return (...args) => {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    },

    /**
     * Throttle Function
     * @param  {Function} callback
     * @param  {Int}   delay
     * @return {Function}
     */
    throttle(callback, delay) {
        let isThrottled = false;
        let args;
        let context;

        function wrapper() {
            if (isThrottled) {
                args = arguments;
                context = this;
                return;
            }

            isThrottled = true;
            callback.apply(this, arguments);

            setTimeout(() => {
                isThrottled = false;
                if (args) {
                    wrapper.apply(context, args);
                    args = context = null;
                }
            }, delay);
        }

        return wrapper;
    }
};
