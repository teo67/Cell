const Command = require('./command');
const { me, viewing } = require('../vars');
const Protein = require('../proteins/protein');
const Container = require('../container');
const proteins = require('../proteins/proteins');
const Organelle = require('../organelle');

//new elements are added to current layer, new elements a are added a layer back (basically if the container explodes)

const oneLayer = (container, newElementsA = []) => {
    if(container.location === Organelle.EXTRACELLULAR) {
        console.log('START: A container outside the cell drifted away... Use \'view\' to view its contents. :END');
        require('../vars').previousContainer = container;
        return true;
    }
    console.log(`START: Operations began on a container with ${container.contents.length} elements.`);
    let doneFunction = false;
    let newElements = [];
    for(let i = 0; i < container.contents.length; i++) {
        const content = container.contents[i];
        if(content instanceof Container) {
            console.log(`-- Operations interrupted for inner container --`)
            if(oneLayer(content, newElements)) {
                if(viewing.Top === content) {
                    viewing.pop();
                    console.log('Your current container was set back to account for the deleted container.');
                }
                container.contents.splice(i, 1);
                i--;
            }
        }
        if(content instanceof Protein && (!doneFunction)) {
            console.log(`${content.name} is searching for targets...`);
            for(let j = 0; j < container.contents.length; j++) {
                if(j != i && content.canfunc(container.contents[j], container, proteins)) {
                    console.log(`${content.name} found a target!`);
                    doneFunction = true;
                    if(content.func(container.contents[j], newElements, proteins/*so that proteins can call themselves*/)) {
                        console.log(`${content.name} destroyed its target in the process!`);
                        if(container.contents[j] instanceof Container && viewing.Top === container.contents[j]) {
                            viewing.pop();
                            console.log('Your current container was set back to account for the destroyed container.');
                        }
                        container.contents.splice(j, 1);
                        j--;
                        if(j <= i) {
                            i--;
                        }
                    }
                }
            }
            if(doneFunction && content.selfDestruct) {
                console.log(`${content.name} destroyed itself after performing its function!`);
                container.contents.splice(i, 1);
                i--;
            }
        }
    }
    if(container.location !== undefined) {
        console.log(`The ${container.location.name}'s rules were applied...`);
        container.location.rules(container);
    }
    container.contents = container.contents.concat(newElements);
    
    console.log('ENDING...');

    if(container.checkEnd !== undefined && (container.checkEnd(container) || container.contents.length == 0) /* kill empty containers */) {
        console.log(`The container completed its function, and its processes are now being ended with end type: ${container.onEnd.name}.`);
        container.onEnd.func(container, newElementsA);
        return true; // kill container
    }
    return false; // don't kill
}

module.exports = new Command('run', () => {
    console.log(`The cell is running...`);
    oneLayer(me);
}, false);