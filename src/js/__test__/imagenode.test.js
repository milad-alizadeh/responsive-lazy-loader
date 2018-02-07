import imagenode from '../imagenode';

describe('Image Node', () => {
    test('getAttr() get class attribute successfully correctly', () => {
        let inputImage = new Image();
        inputImage.setAttribute('src', '#');
        inputImage.setAttribute('alt', 'My Test Image');
        inputImage.setAttribute('class', 'testimage');
        let inputAttr = 'class';
        let output = 'testimage';
        expect(imagenode.getAttr(inputImage, inputAttr)).toBe(output);
    });

    test('getAttr() get attribute with a null value', () => {
        let inputImage = new Image();
        inputImage.setAttribute('src', '#');
        let inputAttr = 'class';
        let output = null;
        expect(imagenode.getAttr(inputImage, inputAttr)).toBe(output);
    });

    test('setAttr() set attribute with value', () => {
        let newImage = new Image();
        imagenode.setAttr(newImage, 'alt', 'Test Alt');
        let output = new Image();
        output.setAttribute('alt', 'Test Alt');
        expect(newImage).toEqual(output);
    });

    test('setAttr() set attribute with undefined value', () => {
        let newImage = new Image();
        imagenode.setAttr(newImage, 'alt', undefined);
        let output = new Image();
        expect(newImage).toEqual(output);
    });

    test('setImageOffsets() set image offsets', () => {
        // let testImage = new Image();
        // let input = [testImage];
        // window.pageYOffset = 200;
        // imagenode.setImageOffsets(input);
        // expect(input[0].offsetY).toBe(200);
    });

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
