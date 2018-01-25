import helpers from '../helpers';

describe('Helpers', () => {
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
});
