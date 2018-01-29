import helpers from './helpers';

/**
 * Image node creation
 * @type {Image}
 */
export default {
    /**
     * Create a promise which returns an image node
     * @param  {DOMNode} dataNode
     * @param {Object} options
     * @return {Promise}
     */
    createImageNode(dataNode, options) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            this.setCustomAttrs(dataNode, img, options);
            this.setAdditionalAttrs(dataNode, img, options);
            img.onload = (e) => resolve(e.target);
            img.onerror = reject;
            return img;
        });
    },

    /**
     * Get attribute of a dom node
     * @param  {[DOMNode]} node
     * @param  {string} attributeName
     * @return {string}
     */
    getAttr(node, attributeName) {
        return node.getAttribute(attributeName);
    },

    /**
     * Loop through each custom attribute and assign it to the new image tag
     * @param {DOM Element} dataNode
     * @param {Image} img
     * @param {Object} options
     */
    setCustomAttrs(dataNode, img, options) {
        this.getCustomImgAttrs(options).forEach((attr) => {
            this.setAttr(img, attr.name, this.getAttr(dataNode, attr.value));
        });
    },

    /**
     * Loop through every attribute on the original image tag and apply it to the new one
     * Excludes the custom attributes that have already been set
     * @param {DOM Element} dataNode
     * @param {Image} img
     * @param {Object} options
     */
    setAdditionalAttrs(dataNode, img, options) {
        [].slice.call(dataNode.attributes).forEach((attr) => {
            if (!['src', 'data-src', 'data-srcset', 'data-sizes'].includes(attr.name)) {
                this.setAttr(img, attr.name, attr.value);
            }
        });
    },

    /**
     * Custom settings for new img tag attributes
     * @param  {Object} options
     * @return {Array}
     */
    getCustomImgAttrs(options) {
        return [
            {
                name: 'srcset',
                value: options.srcset
            },
            {
                name: 'src',
                value: options.src
            },
            {
                name: 'alt',
                value: options.alt
            },
            {
                name: 'sizes',
                value: options.sizes
            }
        ];
    },

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
    },

    /**
     * Set data nodes offsetY
     * @param {Array} dataNodes
     */
    setImageOffsets(dataNodes) {
        dataNodes.forEach(dataNode => {
            dataNode.offsetY = helpers.getNodeOffsetY(dataNode);
        });
    }
};
