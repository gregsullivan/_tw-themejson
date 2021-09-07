# \_tw × theme.json

A Tailwind CSS plugin that automatically pulls colors and widths from a WordPress theme’s theme.json file, initiated as follows:

```js
// tailwind.config.js
plugins: [
	require( '@_tw/themejson' )( require( 'path/to/theme.json' ) ),
]
```

This will extract the base colour palette (`settings.color.palette`) as well as values for `contentSize` and `wideSize`.
