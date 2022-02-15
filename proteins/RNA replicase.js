
const Protein = require('./protein');
const MRNA = require('../genes/mRNA');

module.exports = new Protein(
    'RNA replicase', 
    (obj, container, proteins) => {
        return obj instanceof MRNA;
    }, (obj, newElements, proteins) => {
        console.log(`${obj.codesFor} was duplicated (without any IGNORE tags) and then destroyed!`);
        newElements.push(new MRNA(obj.codesFor.startsWith('IGNORE') ? obj.codesFor.slice(7) : obj.codesFor));
        return true;
    }, 
    true
);