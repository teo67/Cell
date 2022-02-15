const fs = require('fs');

const commands = {};

const files = fs.readdirSync('./commands');
for(const file of files) {
    if(file == 'command.js' || file == 'commands.js') {
        continue;
    }
    const command = require(`./${file}`);
    commands[command.name] = command;
}

module.exports = commands;
