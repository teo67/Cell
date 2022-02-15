const Command = require('./command');
const { me } = require('../vars');
const ligands = require('../ligands/ligands');
module.exports = new Command('ligand', arg => {
    if(ligands[arg] === undefined) {
        console.log('That\'s not a valid ligand to add!');
        return;
    }
    me.addLigand(arg);
}, true);