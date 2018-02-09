import LazyLoader from '../index';

describe('Root', () => {
    let lazyloader = new LazyLoader();

    describe('getDataNodes()', () => {
        test('it should exist', () => {
            expect(lazyloader.getDataNodes).not.toBe(undefined);
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
    });
});
