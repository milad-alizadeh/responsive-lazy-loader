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
        helpers.setAttr(dataNode, 'srcset', helpers.getAttr(dataNode, 'data-srcset'));
        helpers.setAttr(dataNode, 'sizes', helpers.getAttr(dataNode, 'data-sizes'));
        helpers.removeAttr(dataNode, 'data-src');
        helpers.removeAttr(dataNode, 'data-srcset');
        helpers.removeAttr(dataNode, 'data-sizes');

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
            helpers.removeAttr(source, 'data-srcset');
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
