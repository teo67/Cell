const Protein = require('./protein');
const MRNA = require('../genes/mRNA');

module.exports = new Protein(
    'ribosome', 
    (obj, container, proteins) => {
        return (obj instanceof MRNA) && (proteins[obj.codesFor] !== undefined) && (!obj.codesFor.includes('IGNORE')) && (!obj.codesFor.includes('NONCODING')) && ((!proteins[obj.codesFor].hasSignalPolypeptide) || (container.location !== undefined && container.location.name == 'Endoplasmic Reticulum'));
    }, (obj, newElements, proteins) => {
        console.log('The ribosome is copying the target mRNA strand...');
        if(proteins[obj.codesFor] !== undefined) {
            console.log(`A new ${obj.codesFor} protein was produced!`);
            newElements.push(proteins[obj.codesFor]);
            return true;
        } else {
            console.log('There was an error translating the mRNA.');
            return false;
        }
    }, 
    true
);