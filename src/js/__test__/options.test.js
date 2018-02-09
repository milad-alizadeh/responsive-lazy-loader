import options from '../options';

describe('Options', () => {
    describe('setOptions()', () => {
        test('it should combine the new options with defaults', () => {
            let input = {
                throttle: 3000,
                loadOnScroll: false,
                src: 'data-core'
            };

            let output = {
                threshold: 0,
                throttle: 3000,
                resizeDebounce: 500,
                loadOnScroll: false,
                callback: undefined,
                src: 'data-core',
                srcset: 'data-srcset',
                sizes: 'data-sizes'
            };
            expect(options.setOptions(input)).toEqual(output);
        });

        test('it should return default parameters if a bad input is set', () => {
            let input = 'a string';

            let output = {
                threshold: 0,
                throttle: 250,
                resizeDebounce: 500,
                loadOnScroll: true,
                callback: undefined,
                src: 'data-src',
                srcset: 'data-srcset',
                sizes: 'data-sizes'
            };
            expect(options.setOptions(input)).toEqual(output);
        });
    });
});
