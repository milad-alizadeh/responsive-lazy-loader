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

    test('loadingArea', () => {
        // Window height is 768
        // Scroll top is 200
        expect(helpers.loadingArea(10)).toBe(1044.8);
    });
});
