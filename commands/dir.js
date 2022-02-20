const Command = require('./command');
const isInt = require('../isInt');
const print = require('../print');
const viewing = require('../vars').viewing;
module.exports = new Command('dir', () => {
    console.log('Current viewing container: ' + print(viewing.Top));
}, false);