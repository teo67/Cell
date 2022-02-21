const Command = require('./command');
const isInt = require('../isInt');
const print = require('../print');
const {me, viewing} = require('../vars');
module.exports = new Command('dir', () => {
    console.log('Current viewing container: ' + print(viewing.getContainer(me)));
}, false);