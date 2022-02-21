class StackNode {
    constructor(_val, _next = null) {
        this.val = _val;
        this.next = _next;
    }
}

class Stack { // first
    constructor() {
        this.top = null;
    }
    getContainer(me) {
        let returning = me;
        const goBackwards = node => {
            if(node === null) {
                return;
            }
            goBackwards(node.next);
            returning = returning.contents[node.val];
        }
        goBackwards(this.top);
        return returning;
    }
    push(val) {
        this.top = new StackNode(val, this.top);
    }
    pop() {
        if(this.top !== null) {
            this.top = this.top.next;
        }
    }
    clear() {
        this.top = null;
    }
}

module.exports = Stack;