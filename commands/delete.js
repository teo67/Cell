const Command = require('./command');
const isInt = require('../isInt');
const print = require('../print');
const {me, viewing} = require('../vars');
module.exports = new Command('delete', arg => {
    if(!isInt(arg)) {
        console.log('Please supply a nonnegative integer to delete.');
        return;
    }
    const asInt = parseInt(arg);
    const returned = viewing.getContainer(me);
    if(asInt > returned.contents.length) {
        console.log(`The current viewing container doesn't have that many elements in it!`);
        return;
    }
    require('../vars').previousContainer = returned.contents[asInt];
    returned.contents.splice(asInt, 1);
    console.log(`Successfully removed item ${asInt} of the viewing container. Use 'view' to check its contents.`);
    return;
}, true);