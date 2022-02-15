const ligands = require('./ligands/ligands');
const DNA = require('./genes/DNA');
const Container = require('./container');
const EndType = require('./endtype');
const Organelle = require('./organelle');

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
        ], c => false, EndType.DESTROY, Organelle.NUCLEUS));
    }
}

module.exports = Cell;