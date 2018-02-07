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
        // Chage the data-src of sources if we are loading a picture tag
        if (helpers.isInPictureTag(dataNode)) {
            this.setSourceset(dataNode);
        }

        this.setAttr(dataNode, 'src', this.getAttr(dataNode, 'data-src'));

        return new Promise((resolve, reject) => {
            dataNode.onload = (e) => resolve(e.target);
            dataNode.onerror = reject;
            return dataNode;
        });
    },

    setSources(dataNode) {
        let sources = helpers.getSiblings(dataNode);

        sources.forEach(source => {
            this.setAttr(source, 'srcset', this.getAttr(source, 'data-srcset'));
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
     * @param {Array} dataNodes
     */
    setImageOffsets(dataNodes) {
        dataNodes.forEach(dataNode => {
            dataNode.offsetY = helpers.getNodeOffsetY(dataNode);
        });
    }
};
