import imagenode from '../imagenode';

describe('Image Node', () => {
    describe('setSources()', () => {
        test('it should exist', () => {
            expect(imagenode.setSources).not.toBe(undefined);
        });

        test('set picture tag sources data-srcset attribute', () => {
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
            let sources = document.querySelectorAll('source');

            imagenode.setSources(image);

            expect(sources[0].getAttribute('srcset')).toBe('http://via.placeholder.com/400x300');
            expect(sources[1].getAttribute('srcset')).toBe('http://via.placeholder.com/800x600');
        });
    });

    describe('createImage()', () => {
        test('it should exist', () => {
            expect(imagenode.setSources).not.toBe(undefined);
        });

        test('it should change the data node attribute', () => {
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

            let dataNode = document.querySelector('img');
            let sources = document.querySelectorAll('source');

            imagenode.createImage(dataNode);

            expect(dataNode.getAttribute('src')).toBe('http://via.placeholder.com/200x200');
            expect(sources[0].getAttribute('srcset')).toBe('http://via.placeholder.com/400x300');
            expect(sources[1].getAttribute('srcset')).toBe('http://via.placeholder.com/800x600');
        });
    });
});
