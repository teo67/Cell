const Cell = require('./cell');
const Stack = require('./stack');
const me = new Cell();
let previousContainer = null;
const viewing = new Stack(me);
module.exports = { me, previousContainer, viewing };