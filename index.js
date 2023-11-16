const plugin = require('tailwindcss/plugin');

module.exports = plugin.withOptions(
	function () {
		// Use an empty plugin function to accept the options object.
		return function () {};
	},
	function (themejson) {
		// If the theme.json object is not provided, attempt to load it.
		if (typeof themejson !== 'object' || themejson === null) {
			const fs = require('fs');
			const path = require('path');
			let themejsonPath;

			if (typeof themejson === 'string') {
				// If `themejson` is a string, use it as the path to the theme.json
				// file relative to the current working directory.
				themejsonPath = path.join(process.cwd(), themejson);
			} else {
				// Otherwise, use the default path from _tw.
				themejsonPath = path.join(process.cwd(), 'theme/theme.json');
			}

			if (fs.existsSync(themejsonPath)) {
				try {
					themejson = JSON.parse(
						fs.readFileSync(themejsonPath, 'utf8')
					);
				} catch (e) {
					// Handle JSON parsing error.
					console.error('Error parsing JSON:', e);
					return false;
				}
			} else {
				return false;
			}
		}

		// Create an empty object for the theme.json properties.
		const themejsonProps = {};

		// Load all of the colors from the theme.json file.
		if (Array.isArray(themejson.settings.color.palette)) {
			themejsonProps.colors = {};
			themejson.settings.color.palette.forEach(function (color) {
				themejsonProps.colors[color.slug] = color.color;
			});
		}

		// Load all of the widths from the theme.json file.
		themejsonProps.widths = {};
		['content', 'wide'].forEach(function (width) {
			if (undefined !== themejson.settings.layout[width + 'Size']) {
				themejsonProps.widths[width] =
					themejson.settings.layout[width + 'Size'];
			}
		});

		// Update the configuration.
		return {
			theme: {
				extend: {
					colors: {
						...themejsonProps.colors,
					},
					maxWidth: {
						...themejsonProps.widths,
					},
				},
			},
		};
	}
);
