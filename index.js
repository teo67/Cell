const prompt = require('prompt-sync')();
const commands = require('./commands/commands');

let response = '';

console.log('[quit to escape]');
while(response != 'quit') {
    response = prompt('/cell: ');
    if(response != 'quit') {
        const spaceIndex = response.indexOf(' ');
            const cmd = (spaceIndex == -1) ? response : response.slice(0, spaceIndex);
        const arg = (spaceIndex == -1 || spaceIndex == response.length - 1) ? false : response.slice(spaceIndex + 1);
        if(commands[cmd] === undefined) {
            console.log('Command does not exist!');
        } else if(commands[cmd].requiresargument && (!arg)) {
            console.log('Command requires an argument!');
        } else {
            commands[cmd].func(arg);
        }
    }
}

console.log('Cell destroyed!');