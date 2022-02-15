const fs = require('fs');

const ligands = {};

const files = fs.readdirSync('./ligands');
for(const file of files) {
    if(file == 'ligand.js' || file == 'ligands.js') {
        continue;
    }
    ligands[file.slice(0, file.length - 3)] = require(`./${file}`);
}

module.exports = ligands;
