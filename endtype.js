const Container = require('./container');

class EndType {
    constructor(_name, _func) {
        this.name = _name;
        this.func = _func;
    }

    static DESTROY = new EndType('destroy', (container, surrounding) => {
        console.log('A container completed its action and was destroyed.');
    });

    static RELEASE = new EndType('release', (container, surrounding) => {
        console.log('A container released its contents into the surrounding area.');
        for(const content of container.contents) {
            surrounding.push(content);
        }
    });

    static SPLIT(filter, falsecheck = c => false, falseend = EndType.RELEASE, truecheck = falsecheck, trueend = falseend) {
        return new EndType('split', (container, surrounding) => {
            const newfalse = new Container([], falsecheck, falseend, container.location);
            const newtrue = new Container([], truecheck, trueend, container.location);
            for(const content of container.contents) {
                (filter(content) ? newtrue : newfalse).contents.push(content);
            }
            surrounding.push(newfalse);
            surrounding.push(newtrue);
        });
    }
}

module.exports = EndType;