import helpers from './helpers';

/**
 * Lightweight Javascriot plugin for lazy loading images
 * Supports scroll detection
 * @param INT threshold - how much in view do we want the image to be before we lazyload it
 * @param INT throttle - the frequency of our throttle
 * @param INT resizeDebounce - how often we check the resize
 * @param Boolean loadOnScroll - load the images when they're in view or all at once
 * @param Function callback - after the image has loaded
 * @param String core - the base image
 * @param String srcset - the responsive image sizes
 * @param String sizes - at which breakpoint the image sizes show
 * @param String alt - the attribute for the alt text
 */
export default class {
    constructor(options) {
        this.options = this.setOptions(options);
        this.dataNodes = this.getDataNodes();

        if (this.dataNodes.length) {
            this.setListeners();
            this.setImageOffsets();

            if (this.options.loadOnScroll) {
                this.setLoadOnScroll();
            } else {
                this.setLoadOnInit();
            }
        }
    }

    /**
     * Combines our default options with those set on init
     * @return {Object}
     */
    setOptions(options) {
        let defaults = {
            threshold: 0,
            throttle: 250,
            resizeDebounce: 500,
            loadOnScroll: true,
            callback: undefined,
            core: 'data-core',
            srcset: 'data-srcset',
            sizes: 'data-sizes',
            alt: 'alt'
        };

        return {
            ...defaults,
            ...options
        };
    }

    /**
     * Find all data nodes with the core data attribute
     * @return {Object}
     */
    getDataNodes() {
        return helpers.getNodes(`[${this.options.core}]`);
    }

    /**
     * Add scroll and resize listeners
     */
    setListeners() {
        if (this.options.loadOnScroll) {
            window.addEventListener('scroll', helpers.throttle(() => this.setLoadOnScroll(), this.throttle));
        }

        window.addEventListener('resize', helpers.debounce(() => this.recalculateAndLoad(), this.resizeDebounce));
    }

    /**
     * Loop through all the dataNodes
     * Load the image based on their position on page
     */
    setLoadOnScroll() {
        let wh = helpers.getWindowHeight();
        let scrollTop = helpers.getScrollTop();
        let inView = scrollTop + wh + (wh * (this.options.threshold / 100));

        this.dataNodes.forEach((dataNode, index) => {
            if (dataNode.offsetY <= inView) {
                this.loadImage(dataNode);
            }
        });
    }

    /**
     * If images are to be loaded
     */
    setLoadOnInit() {
        this.dataNodes.forEach((dataNode, index) => {
            this.loadImage(dataNode);
        });
    }

    /**
     * Create an image from the data node and place it in dom
     * @param  {DOMNode} dataNode
     */
    loadImage(dataNode) {
        this.createImageNode(dataNode).then((image) => {
            if (dataNode.parentNode) {
                // Replace the dataNode with the loaded image
                dataNode.parentNode.replaceChild(image, dataNode);

                // Remove the loaded dataNode from dataNodes Array
                this.dataNodes = helpers.removeItemFromArray(this.dataNodes, dataNode);

                // Recalculate offsets and reload the visible images
                this.recalculateAndLoad();

                // Run the image callback if it's set
                if (this.options.callback) {
                    this.options.callback(image);
                }
            }
        });
    }

    /**
     * Set data nodes offsetY
     */
    setImageOffsets() {
        this.dataNodes.forEach(dataNode => {
            dataNode.offsetY = helpers.getNodeOffsetY(dataNode);
        });
    }

    /**
     * Create a promise which returns an image node
     * @param  {DOMNode} dataNode
     * @return {Promise}
     */
    createImageNode(dataNode) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            this.setAttr(img, 'class', this.getAttr(dataNode, 'class'));
            this.setAttr(img, 'srcset', this.getAttr(dataNode, this.options.srcset));
            this.setAttr(img, 'src', this.getAttr(dataNode, this.options.core));
            this.setAttr(img, 'alt', this.getAttr(dataNode, this.options.alt));
            this.setAttr(img, 'sizes', this.getAttr(dataNode, this.options.sizes));
            img.onload = (e) => resolve(e.target);
            img.onerror = reject;
            return img;
        });
    }

    /**
     * Set attribute of a dom node
     * @param {[DOMNode]} node
     * @param {string} attributeName
     * @param {string} value
     */
    setAttr(node, attribute, value) {
        if (value) {
            node.setAttribute(attribute, value);
        }
    }

    /**
     * Get attribute of a dom node
     * @param  {[DOMNode]} node
     * @param  {string} attributeName
     * @return {string}
     */
    getAttr(node, attributeName) {
        return node.getAttribute(attributeName);
    }

    /**
     * Recalculate nodes offset
     */
    recalculateAndLoad() {
        this.setImageOffsets();
        if (this.options.loadOnScroll) {
            this.setLoadOnScroll();
        } else {
            this.setLoadOnInit();
        }
    }

    /**
     * Refresh
     * @return {[type]} [description]
     */
    refresh() {
        this.setDataNodes();
        this.recalculateAndLoad();
    }
}
