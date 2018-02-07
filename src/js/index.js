import helpers from './helpers';
import ImageNode from './imagenode';
import Options from './options';

/**
 * Lightweight Javascript plugin for lazy loading images
 * Supports load on scroll or load on page init
 */
export default class {
    constructor(options) {
        this.options = Options.setOptions(options);
        this.dataNodes = this.getDataNodes();

        if (this.dataNodes.length) {
            this.setListeners();
            ImageNode.setImageOffsets(this.dataNodes);
            this.setLoad();
        }
    }

    /**
     * Find all data nodes with the src data attribute
     * @return {Object}
     */
    getDataNodes() {
        return helpers.getNodes(`[${this.options.src}]`);
    }

    /**
     * Set resize and optionally scroll listeners
     */
    setListeners() {
        if (this.options.loadOnScroll) {
            window.addEventListener('scroll', helpers.throttle(() => this.setLoadOnScroll(), this.options.throttle));
        }
        window.addEventListener('resize', helpers.debounce(() => this.recalculateAndLoad(), this.options.resizeDebounce));
    }

    /**
     * Once the image has been added to the DOM
     * @param  {Object} dataNode
     * @param  {Image Node} image
     */
    onImageCreated(dataNode, image) {
        if (dataNode.parentNode) {
            // Replace the dataNode with the loaded image
            this.dataNodes = helpers.removeItemFromArray(this.dataNodes, dataNode);
            // Recalculate offsets and reload the visible images
            this.recalculateAndLoad();

            // Run the image callback if it's set
            if (this.options.callback) {
                this.options.callback(image);
            }
        }
    }

    /**
     * If we want the images to load when they're in the viewport
     */
    setLoadOnScroll() {
        this.dataNodes.forEach((dataNode, index) => {
            let loadingArea = helpers.loadingArea(this.options.threshold);

            if (dataNode.offsetY >= loadingArea.min && dataNode.offsetY <= loadingArea.max) {
                ImageNode.createImageNode(dataNode, this.options).then(image => {
                    this.onImageCreated(dataNode, image);
                });
            }
        });
    }

    /**
     * If we want all of the images to load at once
     */
    setLoadAll() {
        this.dataNodes.forEach((dataNode, index) => {
            ImageNode.createImageNode(dataNode, this.options).then(image => {
                this.onImageCreated(dataNode, image);
            });
        });
    }

    /**
     * Set images to load based on scroll or load all of them
     */
    setLoad() {
        this.options.loadOnScroll ? this.setLoadOnScroll() : this.setLoadAll();
    }

    /**
     * Recalculate the node offsets
     */
    recalculateAndLoad() {
        ImageNode.setImageOffsets(this.dataNodes);
        this.setLoad();
    }

    /**
     * Search for the datanodes again and reload them
     */
    refresh() {
        this.dataNodes = this.getDataNodes();
        this.recalculateAndLoad();
    }
}
