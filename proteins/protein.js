class Protein {
    constructor(_name, _canfunc, _func, _selfDestruct, _hasSignalPolypeptide = false) {
        this.name = _name;
        this.canfunc = _canfunc;
        this.func = _func;
        this.selfDestruct = _selfDestruct;
        this.hasSignalPolypeptide = _hasSignalPolypeptide;
    }
}

module.exports = Protein;