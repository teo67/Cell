const proteins = require('./proteins/proteins');
const Protein = require('./proteins/protein');
const RandomParticle = require('./randomparticle');
const MRNA = require('./genes/mRNA');
const RNA = require('./genes/RNA');
const DNA = require('./genes/DNA');

class Organelle {
    constructor(_name, _rules) {
        this.name = _name;
        this.rules = _rules;
    }

    static EXTRACELLULAR = new Organelle('Extracellular Space', container => {
        return;
    });

    static NUCLEUS = new Organelle('Nucleus', container => {
        let has = {
            dna: false, 
            introns: false,
            mrna: false, 
            other: false
        }
        for(let i = 0; i < container.contents.length; i++) {
            const content = container.contents[i];
            if(content instanceof MRNA) {
                has.mrna = true;
            } else {
                has.other = true;
            }
            if(content instanceof DNA && content.status == 'euchromatin') {
                has.dna = true;
            } else if(content instanceof RNA) {
                if(content.hasIntrons) {
                    has.introns = true;
                } else if(!content.hasCap) {
                    content.hasCap = true;
                    console.log('A GTP cap was added to a strand of pre-mRNA!');
                } else if(!content.hasTail) {
                    content.hasTail = true;
                    console.log('A poly-A tail was added to a strand of pre-mRNA!');
                } else {
                    container.contents.push(new MRNA(content.codesFor));
                    container.contents.splice(i, 1);
                    i--;
                    console.log('A strand of pre-mRNA with a cap and a tail was converted into mRNA!');
                }
            }
        }
        if(has.dna) {
            console.log('RNA polymerase found its way to a segment of euchromatin in the nucleus!');
            container.contents.push(proteins['RNA polymerase']);
        }
        if(has.introns) {
            console.log('A spliceosome found its way to a segment of pre-mRNA with introns still included.');
            container.contents.push(proteins['Spliceosome']);
        }
        if(has.mrna && (!has.other)) {
            console.log('An mRNA-holding container in the nucleus was exported to the cytoplasm!');
            container.location = Organelle.CYTOPLASM;
        }
    });

    static ER = new Organelle('Endoplasmic Reticulum', container => {
        const has = {
            protein: false, 
            mrna: false
        }
        for(let i = 0 ; i < container.contents.length; i++) {
            const content = container.contents[i];
            if(content instanceof MRNA && (proteins[content.codesFor] !== undefined) && (!content.codesFor.includes('IGNORE')) && (!content.codesFor.includes('NONCODING'))) {
                has.mrna = true;
            } else if(content instanceof Protein) {
                has.protein = true;
            } else if(content instanceof RandomParticle && content.name == 'signal recognition particle') {
                console.log('A signal recognition particle was thrown out after reaching the ER.');
                container.contents.splice(i, 1);
                i--;
            }
        }
        if(has.protein && (!has.mrna)) {
            console.log('A container with proteins ready to be exported was shipped from the endoplasmic reticulum to the cytoplasm.'); 
            container.membraneType = 'lipid envelope';
            container.location = Organelle.CYTOPLASM;    
        }
    });

    static CYTOPLASM = new Organelle('Cytoplasm', container => {
        if(container.membraneType == 'lipid envelope') { // export
            console.log(`A container with ${container.contents.length} elements exited the cell through exocytosis!`);
            container.location = Organelle.EXTRACELLULAR;
            return;
        }
        const has = {
            mrna: null, 
            ribosome: false, 
            srp: false
        };
        for(const content of container.contents) {
            if(content instanceof MRNA && (proteins[content.codesFor] !== undefined) && (!content.codesFor.includes('IGNORE')) && (!content.codesFor.includes('NONCODING'))) {
                has.mrna = content;
            } else if(content instanceof Protein && content.name == 'ribosome') {
                has.ribosome = true;
            } else if(content instanceof RandomParticle && content.name == 'signal recognition particle') {
                has.srp = true;
            }
        }
        if(has.mrna !== null) {
            if(!has.ribosome) {
                console.log('A ribosome found its way to the container, which has coding mRNA.');
                container.contents.push(proteins['ribosome']);
            } else {
                if(proteins[has.mrna.codesFor].hasSignalPolypeptide) {
                    if(has.srp) {
                        console.log('The container moved over to the ER using a signal recognition particle.');
                    container.location = Organelle.ER;
                    } else {
                        console.log('A signal recognition particle found its way to the container, which contains coding mRNA headed for the rough ER.');
                        container.contents.push(new RandomParticle('signal recognition particle'));
                    }
                }
            }
        }
    });
}

module.exports = Organelle;