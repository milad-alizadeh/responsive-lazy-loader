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
});
