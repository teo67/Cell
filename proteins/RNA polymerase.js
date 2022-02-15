const Protein = require('./protein');
const RNA = require('../genes/RNA');
const DNA = require('../genes/DNA');

module.exports = new Protein(
    'RNA polymerase', 
    (obj, container, proteins) => {
        return obj instanceof DNA && obj.status == 'euchromatin';
    }, (obj, newElements, proteins) => {
        console.log(`${obj.codesFor} was transcribed into RNA by RNA polymerase!`);
        newElements.push(new RNA(obj.codesFor));
        return false;
    }, 
    true
);