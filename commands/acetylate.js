const Command = require('./command');
const { me } = require('../vars');
const DNA = require('../genes/DNA');

module.exports = new Command('acetylate', arg => {
    const returned = me.search(content => {
        return content instanceof DNA && content.codesFor == arg;
    });
    for(const dna of returned) {
        dna.status = 'euchromatin';
    }
    console.log(`${returned.length} gene(s) named ${arg} were acetylated and are now in the form of euchromatin!`);
}, true);