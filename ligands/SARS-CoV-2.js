const Ligand = require('./ligand');
const Container = require('../container');
const MRNA = require('../genes/mRNA');
const proteins = require('../proteins/proteins');
const EndType = require('../endtype');
const Organelle = require('../organelle');

module.exports = new Ligand(['ACE1'], cell => {
    console.log('SARS-CoV-2 inserted its viral genes into the host cell!');
    cell.addContainer(new Container([
        new MRNA('IGNORE NONCODING SARS-CoV-2 genetic'), // both tags equal ribosome ignore, noncoding cannot be removed
        new MRNA('IGNORE SARS-CoV-2 structural'), 
        new MRNA('RNA replicase')
    ], container => {
        // false for now
        return false;
    }, EndType.RELEASE, Organelle.CYTOPLASM));
});