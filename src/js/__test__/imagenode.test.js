import imagenode from '../imagenode';

describe('Image Node', () => {
    test('setSources() set picture tag sources data-srcset attribute', () => {
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
