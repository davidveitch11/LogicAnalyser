
class FormulaTreeNode {
    constructor () {
        this.children = {};
    }

    getChildren() {
        return this.children;
    }

    toString() {
        return "Error: no string format defined for this class"
    }
}

class OrNode extends FormulaTreeNode {
    constructor (left, right) {
        super();
        this.children = {left, right}
    }

    toString() {
        return "(" + this.children.left.toString() + " V " + this.children.right.toString() + ")"
    }
}

class PropNode extends FormulaTreeNode {
    constructor (name) {
        super();
        this.name = name;
    }

    toString() {
        return this.name;
    }
}

export {
    FormulaTreeNode,
    OrNode,
    PropNode
}
