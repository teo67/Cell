const fs = require('fs');

const proteins = {};

const files = fs.readdirSync('./proteins');
for(const file of files) {
    if(file == 'protein.js' || file == 'proteins.js') {
        continue;
    }
    const protein = require(`./${file}`);
    proteins[protein.name] = protein;
}

module.exports = proteins;
