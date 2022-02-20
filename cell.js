const ligands = require('./ligands/ligands');
const DNA = require('./genes/DNA');
const Container = require('./container');
const EndType = require('./endtype');
const Organelle = require('./organelle');
const MRNA = require('./genes/mRNA');

class Cell {
    constructor() {
        this.contents = [];
    }

    addContainer(container) {
        console.log(`A container with ${container.contents.length} items was added to the ${container.location.name}.`);
        this.contents.push(container);
    }

    addLigand(ligandName) {
        console.log(`${ligandName} is approaching the cell!`);
        ligands[ligandName].onTrigger(this);
    }

    addGene(geneName) {
        console.log(`${geneName} DNA was added to the cell's gene pool!`);
        this.contents.push(new Container([
            new DNA(geneName)
        ], c => {
            let mrna = false;
            let other = false;
            for(const content of c.contents) {
                if(content instanceof MRNA) {
                    mrna = true;
                } else {
                    other = true;
                }
            }
            return mrna && other;
        }, EndType.SPLIT(content => {
            return content instanceof MRNA;
        }), Organelle.NUCLEUS));
    }

    search(filter, viewing = this.contents) {
        let found = [];
        for(const content of viewing) {
            if(content instanceof Container) {
                found = found.concat(this.search(filter, content.contents));
            } else {
                if(filter(content)) {
                    found.push(content);
                }
            }
        }
        return found;
    }
}

module.exports = Cell;