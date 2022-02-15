class Command {
    constructor(_name, _func, _requiresargument = true) {
        this.name = _name;
        this.func = _func;
        this.requiresargument = _requiresargument;
    }
}

module.exports = Command;