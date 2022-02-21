const Command = require('./command');
const isInt = require('../isInt');
const Container = require('../container');
const { me, viewing } = require('../vars');
module.exports = new Command('cd', arg => {
    if(arg.toLowerCase() == 'home') {
        console.log('Stack cleared, viewing container reset to home cell.');
        viewing.clear();
        return;
    }
    if(arg.startsWith('.')) {
        for(let i = 0; i < arg.length; i++) {
            if(arg[i] == '.') {
                viewing.pop();
            }
        }
        console.log(`Viewing container set to object with ${viewing.getContainer(me).contents.length} elements.`);
        return;
    }
    if(!isInt(arg)) {
        console.log('Please supply a nonnegative integer.');
        return;
    }
    const asInt = parseInt(arg);
    const returned = viewing.getContainer(me);
    if(asInt >= returned.contents.length) {
        console.log(`The current container only has ${returned.contents.length} items!`);
        return;
    }
    if(!(returned.contents[asInt] instanceof Container)) {
        console.log('You cannot cd into a non-container object!');
        return;
    }
    viewing.push(asInt);
    console.log(`Current container set to item ${asInt}, with ${viewing.getContainer(me).contents.length} elements.`);
}, true);