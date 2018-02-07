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
            this.setSources(dataNode);
        }

        helpers.setAttr(dataNode, 'src', helpers.getAttr(dataNode, 'data-src'));

        return new Promise((resolve, reject) => {
            dataNode.onload = (e) => resolve(e.target);
            dataNode.onerror = reject;
            return dataNode;
        });
    },

    setSources(dataNode) {
        let sources = helpers.getSiblings(dataNode);

        sources.forEach(source => {
            helpers.setAttr(source, 'srcset', helpers.getAttr(source, 'data-srcset'));
        });
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
