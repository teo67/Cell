const Command = require('./command');
const print = require('../print');
module.exports = new Command('view', () => {
    if(require('../vars').previousContainer === null) {
        console.log('No container to print!');
        return;
    }
    console.log(print(require('../vars').previousContainer));
}, false);