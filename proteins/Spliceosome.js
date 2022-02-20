const Protein = require('./protein');
const RNA = require('../genes/RNA');
const DNA = require('../genes/DNA');

module.exports = new Protein(
    'Spliceosome', 
    (obj, container, proteins) => {
        return obj instanceof RNA && obj.hasIntrons;
    }, (obj, newElements, proteins) => {
        console.log(`A spliceosome removed introns from ${obj.codesFor} pre-mRNA!`);
        obj.hasIntrons = false;
        return false;
    }, 
    true
);