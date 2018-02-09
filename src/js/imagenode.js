import helpers from './helpers';

/**
 * Image node creation
 * @type {Image}
 */
export default {
    /**
     * Change the src, srcset and sizes attributes of a data nod eto load the image
     * @param  {DOMNode} dataNode
     * @param {Function} callback
     * @return {Promise}
     */
    createImage(dataNode, callback) {
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

        dataNode.onload = e => callback(e.target);
        dataNode.onerror = () => {
            throw new Error('Image could not be loaded');
        };
    },

    /**
     * Set srcset attribute of picture tag sources
     * @param {DOMNode} dataNode
     */
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
