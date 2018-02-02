import imagenode from '../imagenode';
import options from '../options';

describe('Image Node', () => {
    let originalImage = (hasParams = true) => {
        let img = new Image();
        img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
        img.setAttribute('data-src', 'https://images.unsplash.com/photo-1485609315582-cfffa02888e8');
        img.setAttribute('data-srcset', 'https://images.unsplash.com/photo-1485609315582-cfffa02888e8?fit=crop&w=200&q=80 200w');
        img.setAttribute('data-sizes', '(max-width 200w)');
        if (hasParams) {
            img.setAttribute('alt', 'My Test Image');
            img.setAttribute('class', 'testimage');
        }
        return img;
    };

    test('get class attribute successfully correctly', () => {
        let inputImage = new Image();
        inputImage.setAttribute('src', '#');
        inputImage.setAttribute('alt', 'My Test Image');
        inputImage.setAttribute('class', 'testimage');
        let inputAttr = 'class';
        let output = 'testimage';
        expect(imagenode.getAttr(inputImage, inputAttr)).toBe(output);
    });

    test('get attribute with a null value', () => {
        let inputImage = new Image();
        inputImage.setAttribute('src', '#');
        let inputAttr = 'class';
        let output = null;
        expect(imagenode.getAttr(inputImage, inputAttr)).toBe(output);
    });

    test('set custom attributes', () => {
        let newImage = new Image();
        imagenode.setCustomAttrs(originalImage(), newImage, options.setOptions());

        let output = new Image();
        output.setAttribute('src', 'https://images.unsplash.com/photo-1485609315582-cfffa02888e8');
        output.setAttribute('srcset', 'https://images.unsplash.com/photo-1485609315582-cfffa02888e8?fit=crop&w=200&q=80 200w');
        output.setAttribute('sizes', '(max-width 200w)');

        expect(newImage).toEqual(output);
    });

    test('set custom attributes should add no attributes if none are set', () => {
        let previousImage = new Image();
        let newImage = new Image();
        imagenode.setCustomAttrs(previousImage, newImage, options.setOptions());
        expect(newImage).toEqual(new Image());
    });

    test('set additional attributes', () => {
        let newImage = new Image();
        imagenode.setAdditionalAttrs(originalImage(), newImage, options.setOptions());

        let output = new Image();
        output.setAttribute('alt', 'My Test Image');
        output.setAttribute('class', 'testimage');

        expect(newImage).toEqual(output);
    });

    test('set additional attributes with no attributes', () => {
        let newImage = new Image();
        imagenode.setAdditionalAttrs(originalImage(false), newImage, options.setOptions());
        expect(newImage).toEqual(new Image());
    });

    test('get custom attributes', () => {
        let input = {
            srcset: 'srcset',
            src: 'src',
            sizes: '400w'
        };

        let output = [
            {
                name: 'srcset',
                value: 'srcset'
            },
            {
                name: 'src',
                value: 'src'
            },
            {
                name: 'sizes',
                value: '400w'
            }
        ];
        expect(imagenode.getCustomImgAttrs(input)).toEqual(output);
    });

    test('get custom attributes with undefined option', () => {
        let input = {
            srcset: 'srcset',
            sizes: '400w'
        };

        let output = [
            {
                name: 'srcset',
                value: 'srcset'
            },
            {
                name: 'sizes',
                value: '400w'
            }
        ];
        expect(imagenode.getCustomImgAttrs(input)).toEqual(output);
    });

    test('set attribute with value', () => {
        let newImage = new Image();
        imagenode.setAttr(newImage, 'alt', 'Test Alt');
        let output = new Image();
        output.setAttribute('alt', 'Test Alt');
        expect(newImage).toEqual(output);
    });

    test('set attribute with undefined value', () => {
        let newImage = new Image();
        imagenode.setAttr(newImage, 'alt', undefined);
        let output = new Image();
        expect(newImage).toEqual(output);
    });

    test('set image offsets', () => {
        let testImage = new Image();
        let input = [testImage];
        window.pageYOffset = 200;
        imagenode.setImageOffsets(input);
        expect(input[0].offsetY).toBe(200);
    });
});
