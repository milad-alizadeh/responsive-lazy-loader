import helpers from './helpers';

export default class {
    constructor(options) {
        this.setOptions(options);
        this.addListeners();
        this.setDataNodes();
        this.setImageOffsets();
        this.setImagesToLoad();
    }

    /**
     * Set Default options
     * @param {Object} options
     */
    setOptions(options) {
        let defaults = {
            threshold: 0,
            throttle: 250,
            resizeDebounce: 500,
            callback: undefined,
            normal: 'data-normal',
            srcset: 'data-srcset',
            sizes: 'data-sizes',
            alt: 'alt'
        };

        this.options = {
            ...defaults,
            ...options
        };
    }

    /**
     * Select all data nodes
     */
    setDataNodes() {
        this.dataNodes = helpers.getNodes(`[${this.options.normal}]`);
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
            this.setAttr(img, 'src', this.getAttr(dataNode, this.options.normal));
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
     * Add scroll and resize listeners
     */
    addListeners() {
        window.addEventListener('scroll', helpers.throttle(() => this.setImagesToLoad(), this.throttle));
        window.addEventListener('resize', helpers.debounce(() => this.recalculateAndLoad(), this.resizeDebounce));
    }

    /**
     * Loop through all the dataNodes and load the image based on their position on page
     */
    setImagesToLoad() {
        if (this.dataNodes.length) {
            let wh = helpers.getWindowHeight();
            let scrollTop = helpers.getScrollTop();
            let inView = scrollTop + wh + (wh * (this.options.threshold / 100));

            this.dataNodes.forEach((dataNode, index) => {
                console.log(dataNode.offsetY, inView);
                if (dataNode.offsetY <= inView) {
                    this.loadImage(dataNode);
                }
            });
        }
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
     * Recalculate nodes offset
     */
    recalculateAndLoad() {
        this.setImageOffsets();
        this.setImagesToLoad();
    }

    /**
     * Find
     * @return {[type]} [description]
     */
    refresh() {
        this.setDataNodes();
        this.recalculateAndLoad();
    }
}
