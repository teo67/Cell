const Protein = require('./protein');
const RNA = require('../genes/RNA');
const DNA = require('../genes/DNA');

module.exports = new Protein(
    'RNA polymerase', 
    (obj, container, proteins) => {
        return obj instanceof DNA && obj.status == 'euchromatin';
    }, (obj, newElements, proteins) => {
        console.log(`${obj.codesFor} DNA was transcribed into RNA by RNA polymerase! It was coiled up into heterochromatin in the process!`);
        obj.status = 'heterochromatin';
        newElements.push(new RNA(obj.codesFor));
        return false;
    }, 
    true
);