Throbber
========

Configurable JavaScript Throbber with the canvas element.

This is an extended object from the tutorial at http://www.milhen.ch/archive/html5-spinner/
which shows how to make a spinning throbber on the canvas element.

This object added options for customization.

Create a new throbber

var throbber = new Throbber();

throbber.start().appendTo();

------------------------------------

Configure the throbber

var throbber = new Throbber({
    size: 40,  // 40 pixels
    color: [255,0,0]  // Red
});

------------------------------------

All available options and default values

size: 20,  				// Pixel size of the throbber
lines: 12, 				// The number of lines
lineWidth: 1,  			// Thickness of the lines, 1-4 recommended
lineHeight: 'long',  	// Length of the lines, 'short' / 'long'
speed: 'slow',  		// How fast the throbber is spinning, 'slow' / 'fast'
color: [0,0,0]  		// RGB color values for the throbber