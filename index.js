var express = require('express');
var gpio = require('rpi-gpio');
// Get express reference.
var app = express();
// Map incoming calls.
app.get('/led', function (req, res) {
    'use strict';
    
    var command = req.query.command; // 0/1 == off/on.    
    var pin = 11; // http://www.raspberrypi.org/documentation/usage/gpio/README.md
    
    gpio.setup(pin, gpio.DIR_OUT, function () {
        // Send signal to Raspberry Pi.
        gpio.write(pin, command, function (err) {
            if (err) {
                throw err;
            }
            console.log('Command ' + command + ' sent to pin ' + pin);
            res.status(200).end();
        });
    });
});

// Cross domain configurations.
app.all('*', function (req, res, next) {
    'use strict';
    // * == all origin.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.listen(3000);

console.log('Server running at port 3000');