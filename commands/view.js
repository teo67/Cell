const Command = require('./command');
module.exports = new Command('view', () => {
    console.log(require('../vars').previousContainer);
}, false);