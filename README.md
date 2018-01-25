# Concertina.js

An accessible, lightweight and modern javascript accordion with no dependencies and extensive api.

## How to install

Using yarn

```
yarn add concertina.js
```

Using npm

```
npm install concertina.js
```

## How to use
### Sample Code
**HTML**

```
<ul class="c-concertina">
    <li class="c-concertina__panel">
        <a id="panel-1" href="#" class="c-concertina__header" role="tab">
            <h2 class="c-concertina__title">Panel Title 1</h2>
            <div class="c-concertina__icon"></div>
        </a>
        <div class="c-concertina__content" role="tabpanel">
            <div class="c-concertina__content-inner">
                ...content
            </div>
        </div>
    </li>

    <li class="c-concertina__panel">
        <a id="panel-2" href="#" class="c-concertina__header" role="tab">
            <h2 class="c-concertina__title">Panel Title 2</h2>
            <div class="c-concertina__icon"></div>
        </a>
        <div class="c-concertina__content" role="tabpanel">
            <div class="c-concertina__content-inner">
                ...content
            </div>
        </div>
    </li>
</ul>

```

**Note:** All the html classes are customizable however the structure of markup needs to be as below for the accordion to work

```
-- Accordion Wrapper
  -- Panel
     -- Panel Header
     -- Panel Content
        -- Panel Content Inner
  -- Panel
     -- Panel Header
     -- Panel Content
        -- Panel Content Inner

```

**Javascript**

```
import Concertina from 'concertina.js';

new Concertina({
    element: '.c-concertina'
});
```

By default this code will grab the first element matching css selector.
alertnatively you can pass a dom node as the wrapper element

```
new Concertina({
    element: document.getElementById('wrapper-id')
});
```

If you would like to create multiple accordions on the same page you can write it like:

```
let accordions = document.querySelectorAll('.c-concertina');

accordions.forEach((accordion) => {
    new Concertina({
        element: accordion
    });
});
```

**CSS**

you can grab the default css from `node_modules/concertina.js/lib/conretina.min.css`

---

### Hash Urls
By default Concertina.js reads the page URL hash (#) and opens the relative panel after page load. to use this feature each accordion panel header needs to be an ```<a>``` tag with a unique id. The href will be dynamically generated from this id.

**example:**

If you got this URL:
```
http://example.com/concertina#panel-2
```
Concertina.js will look for the panel with id ```#panel-2``` and open it after the page is loaded. To turn off this feature use the option ```hashUrl: false```

---

### Options
Conertina.js has a number of options that can be customized upon construction.

Name                 | Type         | Default                          | description
---------------------|--------------|----------------------------------|-----------------
element              | String / Obj | `'.c-concertina'`                | accordion wrapper (selector/DOM node)
transitionClass      | String       | `c-concertina--has-transition`   | transition class
panelClass           | String       | `c-concertina__panel`            | panel class
activePanelClass     | String       | `c-concertina__panel--is-active` | active panel class
headerClass          | String       | `c-concertina__header`           | panel header class
contentClass         | String       | `c-concertina__content`          | panel content class
contentCanvasClass   | String       | `c-concertina__content-canvas`   | panel content inner class
hashUrl              | boolean      | `true`                           | enable hash url update and load
scrollToPanelOnClick | String       | 'mobile'                         | scroll to top of panel after transition. (usefull for mobile) other option as `'all'` to enable for all devices
transition           | boolean      | `true`                           | enables animation when accordion is closed and opened
closeOthers          | boolean      | `true`                           | close other panels when one panel is clicked

---

### API Methods
Concertina.js has a provides a simple api for you to control the plugin. these includes a series of methods.

```
let conc = new Concertina({
    element: document.getElementById('wrapper-id')
});

conc.openAll();
```
Methods                 | Args       | Description    
------------------------|------------|------------
getPanelsState()        |            | returns an array of all panels and their currentState (open/close)
close()                 | panelIndex | close a panel using its index
open()                  | panelIndex | open a panel using its index
closeAll()              |            | close all panels
openAll()               |            | open all panels
recalculateHeights()    |            | recalculates the height of all panels. This method is very useful if you are populating the panel content using ajax or waiting for images to load. simply call this method on your callbacks
---

### Browser Support
Concertina.js works with all of the modern browsers including IE10 and above.
