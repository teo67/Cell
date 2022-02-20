class StackNode {
    constructor(_val, _next = null) {
        this.val = _val;
        this.next = _next;
    }
}

class Stack {
    constructor(_top = null) {
        this.top = (_top === null ? null : new StackNode(_top));
    }
    get Top() {
        return this.top.val;
    }
    push(val) {
        this.top = new StackNode(val, this.top);
    }
    pop() {
        if(this.top !== null) {
            this.top = this.top.next;
        }
    }
}

module.exports = Stack;