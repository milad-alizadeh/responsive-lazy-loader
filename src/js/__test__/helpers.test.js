import helpers from '../helpers';

describe('Helpers', () => {
    beforeEach(() => {
        window.pageYOffset = 200;
        Element.prototype.getBoundingClientRect = jest.fn(() => {
            return {
                width: 200,
                height: 200,
                top: 1000,
                left: 0,
                bottom: 0,
                right: 0
            };
        });
    });

    describe('getNodes()', () => {
        test('it should exist', () => {
            expect(helpers.getNodes).not.toBe(undefined);
        });

        test('it should return an array of dom nodes', () => {
            document.body.innerHTML = `
                <div class="container-1">
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                </div>
                <div class="container-2">
                    <div class="item"></div>
                    <div class="item"></div>
                </div>
            `;

            let items = helpers.getNodes('.item', document.querySelector('.container-2'));

            expect(Array.isArray(items)).toBe(true);
            expect(items.length).toBe(2);

            items = helpers.getNodes('.item');
            expect(items.length).toBe(5);
        });
    });

    describe('getSiblings()', () => {
        test('it should exist', () => {
            expect(helpers.getSiblings).not.toBe(undefined);
        });

        test('it should get all node siblings', () => {
            document.body.innerHTML = `
                <div class="container-1">
                    <div class="item-1"></div>
                    <div class="item-2"></div>
                    <div class="item-3"></div>
                </div>
            `;

            let item2 = document.querySelector('.item-2');
            let siblings = helpers.getSiblings(item2);

            expect(siblings.length).toBe(2);
            expect(siblings[0].classList.contains('item-1')).toBe(true);
        });
    });

    describe('getAttr()', () => {
        test('it should exist', () => {
            expect(helpers.getAttr).not.toBe(undefined);
        });

        test('it shoulld get class attribute successfully correctly', () => {
            let inputImage = new Image();
            inputImage.setAttribute('src', '#');
            inputImage.setAttribute('alt', 'My Test Image');
            inputImage.setAttribute('class', 'testimage');
            let inputAttr = 'class';
            let output = 'testimage';
            expect(helpers.getAttr(inputImage, inputAttr)).toBe(output);
        });

        test('it should get attribute with a null value', () => {
            let inputImage = new Image();
            inputImage.setAttribute('src', '#');
            let inputAttr = 'class';
            let output = null;
            expect(helpers.getAttr(inputImage, inputAttr)).toBe(output);
        });
    });

    describe('setAttr()', () => {
        test('it should exist', () => {
            expect(helpers.setAttr).not.toBe(undefined);
        });

        test('it should set attribute with value', () => {
            let newImage = new Image();
            helpers.setAttr(newImage, 'alt', 'Test Alt');
            let output = new Image();
            output.setAttribute('alt', 'Test Alt');
            expect(newImage).toEqual(output);
        });

        test('it should set attribute with undefined value', () => {
            let newImage = new Image();
            helpers.setAttr(newImage, 'alt', undefined);
            let output = new Image();
            expect(newImage).toEqual(output);
        });
    });

    describe('removeAttr()', () => {
        test('it should exist', () => {
            expect(helpers.removeAttr).not.toBe(undefined);
        });

        test('it should remove attributes of a given node', () => {
            let inputImage = new Image();
            inputImage.setAttribute('data-src', '#');

            helpers.removeAttr(inputImage, 'data-src');

            expect(inputImage.getAttribute('data-src')).toBeFalsy();
        });
    });

    describe('isInPictureTag()', () => {
        test('it should exist', () => {
            expect(helpers.isInPictureTag).not.toBe(undefined);
        });

        test('it should check if an image is in a picture tag', () => {
            document.body.innerHTML = `
                <picture>
                <source
                    data-srcset="http://via.placeholder.com/400x300"
                    media="(max-width: 500px)" />
                <source
                    data-srcset="http://via.placeholder.com/800x600" />
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    data-src="http://via.placeholder.com/200x200"
                    class="image"
                    alt="" />
                </picture>
            `;

            let image = document.querySelector('.image');

            expect(helpers.isInPictureTag(image)).toBe(true);
        });
    });

    describe('getNodeOffsetY()', () => {
        test('it should exist', () => {
            expect(helpers.getNodeOffsetY).not.toBe(undefined);
        });

        test('it should return the vertical offset of a given node', () => {
            document.body.innerHTML = `
                <div class="item"></div>
            `;
            let offsetY = helpers.getNodeOffsetY(document.querySelector('.item'));
            expect(offsetY).toBe(1200);
        });
    });

    describe('getScrollTop()', () => {
        test('it should exist', () => {
            expect(helpers.getScrollTop).not.toBe(undefined);
        });

        test('it should return the vertical scroll from the top of document()', () => {
            expect(helpers.getScrollTop()).toBe(200);
        });
    });

    describe('getWindowHeight()', () => {
        test('it should exist', () => {
            expect(helpers.getWindowHeight).not.toBe(undefined);
        });

        test('it should return the height of the window', () => {
            expect(helpers.getWindowHeight()).toBe(768);
        });
    });

    describe('removeItemFromArray()', () => {
        test('it should exist', () => {
            expect(helpers.removeItemFromArray).not.toBe(undefined);
        });

        test('it should remove an item from an array and return the remaining array', () => {
            let array = [1, 2, 3, 4];

            let newArray = helpers.removeItemFromArray(array, array[2]);

            expect(newArray.length).toBe(3);
            expect(newArray).toEqual([1, 2, 4]);
        });
    });

    describe('loadingArea()', () => {
        test('it should exist', () => {
            expect(helpers.loadingArea).not.toBe(undefined);
        });

        test('it should calculate the loading area of images', () => {
            // Window height is 768
            // Scroll top is 200
            expect(helpers.loadingArea(10).max).toBe(1044.8);
            expect(helpers.loadingArea(10).min).toBe(0);
        });
    });
});
