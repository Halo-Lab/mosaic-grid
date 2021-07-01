# mosaic-grid

Add _your_ effects to your blocks 👾

### Get started

Package is framework-agnostic and can be used in plain JavaScript projects.

To install package just write:

```sh
$ npm i mosaic-grid
```

### Using

This package allows you transform part of the image in some `mosaic` way.

> Actually it can transform any block without children.

[See an example here](). _WIP_

For this you should call `mosaic` function with options.

It is simple object with configuration properties:

```ts
interface MosaicOptions {
  /** Length of cell. By default, it is **20px**. */
  readonly cell?: number;
  /** Describes figure shift from grid center. */
  readonly shift: Shift;
  /** Defines size of fugure relative to lowest side of a grid. */
  readonly range: number;
  /** Width of grid. */
  readonly width?: number;
  /** Height of grid. */
  readonly height?: number;
  /**
   * Element in DOM from which _width_ and _height_
   * can be taken. If _width_, _height_ and _element_
   * are provided then first two arguments will take
   * precedence while calculating size.
   */
  readonly element?: string | HTMLElement;
  /**
   * Classes that will be added randomly to cells that
   * will be covered by figure.
   */
  readonly effects?: ReadonlyArray<string>;

  /** Function that is used to build figure. */
  figure: FigureCreator<Figure>;
}
```

You should provide at least four necessary properties: `shift`, `range`, `figure` and `element`. These properties are necessary to draw transformed block as grid and to know where we should insert transformed block. By default, size of block will be taken from provided element, but you can change it by providing `width` and `height` properties.

> Package handles \<img> element specially: it can take image source and gather the image from cells. Width of created block will be natural width of image and for height is the same behavior.

- `cell` property defines dimension of single cell in grid. You can customize it as you need.

- `figure` used to build shape of the area of a block that should be transformed.

- `shift` parameter describes shift of the center of a circle from grid center. It is object with `dx` and `dy` properties that can be any number from **-1** to **1**.
- `range` is abstract dimension of size of the figure. It can be any number from **0** to **1**.

```js
import { mosaic } from 'mosaic-grid';

const img = document.querySelector('img');

mosaic({
  range: 0.4,
  element: img,
  figure: circle,
  shift: { dx: 0.7, dy: 0.5 },
});
```

At that time there is only one figure available - `circle`.

After building mosaic on the page you need to import base styles for it. You can do it either via CSS with some preprocessor, like [PostCSS](https://postcss.org/), or if you use JavaScript bundlers, you can import style file directly in `.js` file:

```js
import 'mosaic-grid/styles.css';
```

## Word from author

Have fun! ✌️

<a href="https://www.halo-lab.com/?utm_source=github-brifinator-3000">
  <img src="https://api.halo-lab.com/wp-content/uploads/dev_halo.svg" alt="Developed in Halo lab" height="60">
</a>
