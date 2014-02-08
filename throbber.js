// Constructor
Throbber = function(config) {
    this.config = {
        size: 20,  				// Pixel size of the throbber
        lines: 12, 				// How many lines the throbber has
        lineWidth: 1,  			// How thick the lines are, 1-4 recommended
        lineHeight: 'long',  	// How long the lines are 'short' / 'long'
        speed: 'slow',  		// How fast the throbber is spinning, 'slow' / 'fast'
        color: [0,0,0]  		// RGB color values for the throbber
    };

    // Extend the configuration
    this.extend(this.config, config);

    // Create the canvas element
    this.canvas = document.createElement('canvas');

    // Set canvas width and height
    this.canvas.width = this.config.size;
    this.canvas.height = this.config.size;

    // Set the canvas.context property
    this.ctx = this.canvas.getContext('2d');


    // When the throbber started spinning
    this.started = new Date();

    // Whether or not the throbber is visible, 0 is hidden, 1 is visible
    this.state = 0;

    // Hide the throbber by default
    this.stop();

    // Draw the throbber
    this.draw();
};

// Prototype
Throbber.prototype = {

    constructor: Throbber,

    /** -------------------------------------------------------------
     * Extend the configuration
     */
    extend: function(d, o) {
        d = d || {};
        for(var i in o) {
            d[i] = o[i];
        }
        return d;
    },

    /** -------------------------------------------------------------
     * Append the throbber to an element
     */
    appendTo: function(id) {
        var e = document.getElementById(id);
        e.appendChild(this.canvas);

        return this;
    },

    /** -------------------------------------------------------------
     * Replace the contents of an element with the throbber
     */
    html: function(id) {
        var e = document.getElementById(id);
        e.innerHTML = '';
        e.appendChild(this.canvas);

        return this;
    },

    /** -------------------------------------------------------------
     * Start the throbber
     */
    start: function() {
        var self = this;

        self.canvas.style.display = 'block';

        self.state = 1;

        self.draw();

        return this;
    },

    /** -------------------------------------------------------------
     * Stop the throbber
     */
    stop: function() {
        var self = this;

        self.canvas.style.display = 'none';

        self.state = 0;

        return this;
    },

    /** -------------------------------------------------------------
     * Toggle the throbber
     */
    toggle: function() {
        var self = this;

        if(self.state === 0) {
            self.start();
        } else {
            self.stop();
        }

        return this;
    },

    /** -------------------------------------------------------------
     * Draw the throbber
     */
    draw: function() {
        var self = this;

        // Get the rotations
        var rotationsSinceStarted = (new Date() - self.started) / 1000;
        var rotationInTwelfths = parseInt(rotationsSinceStarted * self.config.lines) / self.config.lines;

        // Save the settings
        self.ctx.save();

        // Clear the canvas
        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);

        // Move the canvas origin so the throber is placed in the top left corner
        self.ctx.translate(self.config.size * 2 / 4, self.config.size * 2 / 4);

        // Decide which speed to use
        var speed = self.config.speed == 'fast' ? 4 : 2;

        // Rotate the canvas
        self.ctx.rotate((Math.PI * speed * rotationInTwelfths));

        for(var i=0; i<self.config.lines; i++) {

            // Reduce the alpha by 1/12th
            self.ctx.strokeStyle = 'rgba(' + self.config.color.join(',') + ',' + i / self.config.lines + ')';

            self.ctx.rotate(Math.PI * 2 / self.config.lines);
            self.ctx.beginPath();

            var lineHeight = self.config.lineHeight == 'short' ? 1.5 : 1;

            self.ctx.moveTo(self.config.size * lineHeight / 4, 0);
            self.ctx.lineTo(self.config.size * 2 / 4, 0);
            self.ctx.lineWidth = self.config.lineWidth;
            self.ctx.stroke();
        }

        // Restore old settings
        self.ctx.restore();

        // If the throbber is visible, keep spinning it
        if(self.state === 1) {
            window.setTimeout(function() {
                self.draw();
            }, 1000 / 30);
        }
    }
};