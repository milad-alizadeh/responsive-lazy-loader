import helpers from './helpers';

export default class {
    constructor(options) {
        this.setOptions(options);
        this.setDataNodes();
        this.setImageOffsets();
        this.setImagesToLoad();
        this.addListeners();
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
     * Create an image node based on a dataNode
     * @param  {DOMNode} dataNode
     * @return {[type]}          [description]
     */
    createImageNode(dataNode) {
        let img = new Image();
        this.setAttr(img, 'class', this.getAttr(dataNode, 'class'));
        this.setAttr(img, 'srcset', this.getAttr(dataNode, this.options.srcset));
        this.setAttr(img, 'src', this.getAttr(dataNode, this.options.normal));
        this.setAttr(img, 'alt', this.getAttr(dataNode, this.options.alt));
        this.setAttr(img, 'sizes', this.getAttr(dataNode, this.options.sizes));
        return img;
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
        window.addEventListener('resize', helpers.debounce(() => this.recalculateOffset(), this.resizeDebounce));
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
                if (dataNode.parentNode && dataNode.offsetY <= inView) {
                    this.loadImage(dataNode);
                    this.setDataNodes();
                }
            });
        }
    }
    /**
     * Create an image from the data node and place it in dom
     * @param  {DOMNode} dataNode
     */
    loadImage(dataNode) {
        let image = this.createImageNode(dataNode);
        dataNode.parentNode.replaceChild(image, dataNode);
    }

    /**
     * Recalculate nodes offset
     */
    recalculateOffset() {
        this.setImageOffsets();
    }
}
