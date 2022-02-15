class RNA {
    constructor(_codesFor) {
        this.codesFor = _codesFor;
        this.hasCap = false;
        this.hasIntrons = true;
        this.hasTail = false;
    }
}

module.exports = RNA;