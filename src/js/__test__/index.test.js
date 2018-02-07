import LazyLoader from '../index';

describe('Root', () => {
    test('constructor()', () => {
        // let lazyLoader = new LazyLoader();
    });

    test('getDataNodes()', () => {
        document.body.innerHTML = `
            <div class="container-1">
                <img data-original="01.jpg" class="image-1" alt="" />
                <img data-original="02.jpg" class="image-2" alt="" />
            </div>
        `;

        let lazyLoader = new LazyLoader({
            src: 'data-original'
        });

        let dataNodes = lazyLoader.getDataNodes();

        expect(dataNodes.length).toBe(2);
        expect(dataNodes[0].classList.contains('image-1')).toBe(true);
    });

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
