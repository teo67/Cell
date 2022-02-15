class Container {
    constructor(_contents, _checkEnd, _onEnd, _location, _membraneType = 'default') {
        this.contents = _contents;
        this.checkEnd = _checkEnd;
        this.onEnd = _onEnd;
        this.location = _location;
        this.membraneType = _membraneType;
    }
}

module.exports = Container;