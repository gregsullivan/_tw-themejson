# \_tw × theme.json

A Tailwind CSS plugin that automatically pulls colors and widths from a WordPress theme’s `theme.json` file, initiated as follows:

```js
// tailwind.config.js
plugins: [
	require('@_tw/themejson'),
]
```

By default, the `theme.json` file will be loaded from `./theme/theme.json`, relative to the current working directory. (The default path corresponds with that of [\_tw](https://underscoretw.com).) You can override this location by passing a new path as a string:

```js
// tailwind.config.js
plugins: [
	require('@_tw/themejson')('path/to/theme.json'),
]
```

You can also parse `theme.json` yourself and pass in the corresponding object:

```js
// tailwind.config.js
plugins: [
	require('@_tw/themejson')(require('path/to/theme.json')),
]
```

You may need to manage caching should you choose to use `require` to parse the JSON file.

After initiation, the plugin will extract the base color palette (`settings.color.palette`) as well as values for `contentSize` and `wideSize`.

If one or more of your color palette’s `slug` values matches a slug in Tailwind’s default color palette, those colors from the default palette—including all shades—will be overridden by the `color` value from your `theme.json` file.
