const Protein = require('./protein');
const MRNA = require('../genes/mRNA');
const RandomParticle = require('../randomparticle');

module.exports = new Protein( // basically empty
    'SARS-CoV-2 structural', 
    (obj, container, proteins) => {
        return false;
    }, (obj, newElements, proteins) => {
        return true;
    }, 
    true, 
    true
);