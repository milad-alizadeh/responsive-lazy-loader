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
            this.setAttr(img, 'class', this.getAttr(dataNode, 'class'));
            this.setAttr(img, 'srcset', this.getAttr(dataNode, options.srcset));
            this.setAttr(img, 'src', this.getAttr(dataNode, options.src));
            this.setAttr(img, 'alt', this.getAttr(dataNode, options.alt));
            this.setAttr(img, 'sizes', this.getAttr(dataNode, options.sizes));
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
     */
    setImageOffsets(dataNodes) {
        dataNodes.forEach(dataNode => {
            dataNode.offsetY = helpers.getNodeOffsetY(dataNode);
        });
    }
};
