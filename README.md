# Responsive Lazy Loader
[![npm version][npm-badge-version]][npm-link] [![Build Status][travis-badge]][travis-link] [![Code Coverage][codecov-badge]][codecov-link] [![devDependency Status](https://david-dm.org/boennemann/badges/dev-status.svg)](https://david-dm.org/boennemann/badges#info=devDependencies)

[npm-badge-version]: https://img.shields.io/npm/v/responsive-lazy-loader.svg
[npm-link]: https://www.npmjs.com/package/responsive-lazy-loader
[travis-badge]: https://travis-ci.org/milad-alizadeh/responsive-lazy-loader.svg?branch=master
[travis-link]: https://travis-ci.org/milad-alizadeh/responsive-lazy-loader
[codecov-badge]: https://codecov.io/gh/milad-alizadeh/responsive-lazy-loader/branch/master/graph/badge.svg
[codecov-link]: https://codecov.io/gh/milad-alizadeh/responsive-lazy-loader

Responsive Lazy Loader is a lightweight script that loads your images when they enter the viewport. Not only that but it honours your responsive (srcset) images.

## Installation

[yarn](https://yarnpkg.com/en/)

```sh
yarn add responsive-lazy-loader
```

[npm](https://www.npmjs.com/)

```sh
npm install responsive-lazy-loader
```

## Usage

Ensure your `<img />` tags have a `data-src` attribute with a path to your image and a default image `src`. After you've initialised the script, your images will lazy load out of the box. For example:

JS:

```js
import ResponsiveLazyLoader from 'responsive-lazy-loader';

new ResponsiveLazyLoader();
```

HTML:

```html
<img data-src="http://via.placeholder.com/800x600"
	src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
	alt="My Special Image"
/>
```

Once the image comes into view, it will output:

```html
<img src="http://via.placeholder.com/800x600"
	alt="My Special Image"
/>
```

The script also takes into account ```srcset``` and ```sizes``` by binding them to data attributes. For example:

```html
<img data-src="http://via.placeholder.com/800x600"
	data-srcset="http://via.placeholder.com/400x300 400w, http://via.placeholder.com/800x600 800w"
	data-sizes="(max-width: 500px) 400px, 800px"
/>
```

You can also lazyload picture tags using this ibrary. Please bear in mind that picture tag is not supported in all browsers. In order to make picture tag work you need to use a picture tag polyfill such as [picturefill](https://scottjehl.github.io/picturefill/)

```html
<picture>
	<source	data-srcset="http://via.placeholder.com/400x300" media="(max-width: 500px)" />
	<source data-srcset="http://via.placeholder.com/800x600" />
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        data-src="http://via.placeholder.com/200x200"
        class=""
        alt="" />
</picture>

```

## Parameters

### `(src, srcset, sizes, callback, loadOnScroll, resizeDebounce, throttle, threshold)`

<table>
    <tr>
        <th>parameter</th>
        <th>description</th>
    </tr>
    <tr>
        <th><code>src</code></th>
        <td>
            Type: <code>string</code><br>
            Default: <code>'data-src'</code><br><br>
            The data attribute we want to use for the images <code>src</code> attribute.
        </td>
    </tr>
    <tr>
        <th><code>srcset</code></th>
        <td>
            Type: <code>string</code><br>
            Default: <code>'data-srcset'</code><br><br>
            The data attribute we want to use for the images <code>srcset</code> attribute.
        </td>
    </tr>
    <tr>
        <th><code>sizes</code></th>
        <td>
            Type: <code>string</code><br>
            Default: <code>'data-sizes'</code><br><br>
            The data attribute we want to use for the images <code>sizes</code> attribute.
        </td>
    </tr>
    <tr>
        <th><code>callback</code></th>
        <td>
            Type: <code>function</code><br>
            Default: <code>undefined</code><br><br>
            An optional function that will be called after each image has been loaded.
        </td>
    </tr>
    <tr>
        <th><code>loadOnScroll</code></th>
        <td>
            Type: <code>Boolean</code><br>
            Default: <code>true</code><br><br>
            Do you want to load the images when they are in the viewport or all once?
        </td>
    </tr>
    <tr>
        <th><code>resizeDebounce</code></th>
        <td>
            Type: <code>INT</code><br>
            Default: <code>500</code><br><br>
            How long after the user stops resizing their browser window before firing the resize recalculations.
        </td>
    </tr>
    <tr>
        <th><code>throttle</code></th>
        <td>
            Type: <code>INT</code><br>
            Default: <code>250</code><br><br>
            How often the scroll event listener fires to check if the image is in view.
        </td>
    </tr>
    <tr>
        <th><code>threshold</code></th>
        <td>
            Type: <code>INT</code><br>
            Default: <code>0</code><br><br>
            How much of an offset do you want for the image to be classed as in the viewport?
        </td>
    </tr>
</table>

MIT
