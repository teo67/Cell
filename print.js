const Container = require('./container');
const DNA = require('./genes/DNA');
const RNA = require('./genes/RNA');
const MRNA = require('./genes/mRNA');
const Protein = require('./proteins/protein');
const RandomParticle = require('./randomparticle');
const print = (input, numSpaces = 0) => {
    let returning = '';
    for(let i = 0; i < input.contents.length; i++) {
        returning += `\n${' '.repeat(numSpaces)}${i}: `;
        if(input.contents[i] instanceof Container) {
            returning += `Inner Container [${input.contents[i].location.name}]`;
            returning += print(input.contents[i], numSpaces + 4);
        } else if(input.contents[i] instanceof DNA) {
            returning += `${input.contents[i].status} DNA coding for ${input.contents[i].codesFor}`;
        } else if(input.contents[i] instanceof RNA) {
            returning += `RNA coding for ${input.contents[i].codesFor}, ${input.contents[i].hasIntrons ? 'with' : 'without'} introns, ${input.contents[i].hasCap ? 'with' : 'without'} cap, ${input.contents[i].hasTail ? 'with' : 'without'} tail`;
        } else if(input.contents[i] instanceof MRNA) {
            returning += `MRNA coding for ${input.contents[i].codesFor}`;
        } else if(input.contents[i] instanceof Protein || input.contents[i] instanceof RandomParticle) {
            returning += input.contents[i].name;
        }
    }
    return returning;
}
module.exports = print;