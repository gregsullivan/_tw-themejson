# \_tw × theme.json

A Tailwind CSS plugin that automatically pulls colors and widths from a WordPress theme’s `theme.json` file, initiated as follows:

```js
// tailwind.config.js
plugins: [
	require( '@_tw/themejson' )( require( 'path/to/theme.json' ) ),
]
```

This will extract the base color palette (`settings.color.palette`) as well as values for `contentSize` and `wideSize`.

If one or more of your color palette’s `slug` values matches a slug in Tailwind’s default color palette, those colors from the default palette—including all shades—will be overridden by the `color` value from your `theme.json` file.
