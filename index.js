const plugin = require( 'tailwindcss/plugin' );

module.exports = plugin.withOptions(
	function() {
		// Use an empty plugin function to accept the options object.
		return function() {};
	}, function( themejson ) {
		// Create an empty object for the theme.json properties.
		const themejsonProps = {};

		// Load all of the colors from the theme.json file.
		if ( Array.isArray( themejson.settings.color.palette ) ) {
			themejsonProps.colors = {};
			themejson.settings.color.palette.forEach( function( color ) {
				themejsonProps.colors[ color.slug ] = color.color;
			} );
		}

		// Load all of the widths from the theme.json file.
		themejsonProps.widths = {};
		[ 'content', 'wide' ].forEach( function( width ) {
			if ( undefined !== themejson.settings.layout[ width + 'Size' ] ) {
				themejsonProps.widths[ width ] = themejson.settings.layout[ width + 'Size' ];
			}
		} );

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
	},
);
