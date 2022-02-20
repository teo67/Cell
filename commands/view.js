const Command = require('./command');
const print = require('../print');
module.exports = new Command('view', () => {
    console.log(print(require('../vars').previousContainer));
}, false);