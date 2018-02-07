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

    test('getNodes()', () => {
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

    test('getSiblings()', () => {
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

    test('isInPictureTag()', () => {
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

    test('getNodeOffsetY()', () => {
        document.body.innerHTML = `
            <div class="item"></div>
        `;
        let offsetY = helpers.getNodeOffsetY(document.querySelector('.item'));
        expect(offsetY).toBe(1200);
    });

    test('getScrollTop()', () => {
        expect(helpers.getScrollTop()).toBe(200);
    });

    test('getWindowHeight()', () => {
        expect(helpers.getWindowHeight()).toBe(768);
    });

    test('removeItemFromArray()', () => {
        let array = [1, 2, 3, 4];

        let newArray = helpers.removeItemFromArray(array, array[2]);

        expect(newArray.length).toBe(3);
        expect(newArray).toEqual([1, 2, 4]);
    });

    test('loadingArea()', () => {
        // Window height is 768
        // Scroll top is 200
        expect(helpers.loadingArea(10).max).toBe(1044.8);
        expect(helpers.loadingArea(10).min).toBe(0);
    });
});
