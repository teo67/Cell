const Command = require('./command');
const { me } = require('../vars');
module.exports = new Command('genome', arg => {
    me.addGene(arg);
}, true);