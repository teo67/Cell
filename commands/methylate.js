const Command = require('./command');
const { me } = require('../vars');
const DNA = require('../genes/DNA');

module.exports = new Command('methylate', arg => {
    const returned = me.search(content => {
        return content instanceof DNA && content.codesFor == arg;
    });
    for(const dna of returned) {
        dna.status = 'heterochromatin';
    }
    console.log(`${returned.length} gene(s) named ${arg} were methylated and are now in the form of heterochromatin!`);
}, true);