import LazyLoader from '../index';

describe('Root', () => {
    test('onImageCreated()', () => {
        // // Input div with child image
        // let inputNode = document.createElement('div');
        // let childNode = new Image();
        // childNode.setAttribute('id', 'original');
        // inputNode.appendChild(childNode);
        //
        // // Output node with image of an id of 'new'
        // let outputNode = document.createElement('div');
        // let outputImage = new Image();
        // outputImage.setAttribute('id', 'new');
        // outputNode.appendChild(outputImage);
        //
        // // An imitation of our 'outputImage' above
        // let newImage = new Image();
        // newImage.setAttribute('id', 'new');
        //
        // // Replace the childNode with our newImage node
        // // This should then equal our outputNode
        // let root = new LazyLoader();
        // root.onImageCreated(childNode, newImage);
        //
        // expect(inputNode).toEqual(outputNode);
    });
});
