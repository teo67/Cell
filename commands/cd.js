const Command = require('./command');
const isInt = require('../isInt');
const Container = require('../container');
const viewing = require('../vars').viewing;
module.exports = new Command('cd', arg => {
    if(!isInt(arg)) {
        console.log('Please supply a nonnegative integer.');
        return;
    }
    const asInt = parseInt(arg);
    if(asInt >= viewing.Top.contents.length) {
        console.log(`The current container only has ${viewing.Top.contents.length} items!`);
        return;
    }
    if(!(viewing.Top.contents[asInt] instanceof Container)) {
        console.log('You cannot cd into a non-container object!');
        return;
    }
    viewing.push(viewing.Top.contents[asInt]);
    console.log(`Current container set to item ${asInt}, with ${viewing.Top.contents.length} elements.`);
}, true);