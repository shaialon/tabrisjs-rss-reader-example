var config = require('./../config.js').config;

// refresh the ui styling based on the theme (and color passed.
function updateUIColors(color){
	if(config.theme === 'light'){
		tabris.ui.set({background: 'white', textColor: color });
		tabs.set({background: 'white', textColor: color});
	}
	else if (config.theme === 'full') {
		tabris.ui.set({background: color, textColor: 'white' });
		tabs.set({background: color, textColor: 'white'});
	}
	else if (config.theme === 'normal') {
		tabris.ui.set({background: color, textColor: 'white' });
		tabs.set({background: 'white',textColor: color});
	}
	// If the theme is other then just fall back to system defaults.
}


module.exports = {
	updateUIColors: updateUIColors
};
