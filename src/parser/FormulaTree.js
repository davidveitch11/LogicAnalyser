
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

    /**
     * Returns an array of all single propositions (like p or q) in this tree
     */
    getProps() {
        console.error("Error: did not define getProps for this class")
        return []
    }

    /**
     * Evaluate this formula by assigning the propositions in the first argument
     * with the values in the second argument
     */
    evaluate() {
        console.error("Error: did not define evaluate for this class")
        return false;
    }
}

class BinopNode extends FormulaTreeNode {
    constructor (left, right, op) {
        super();
        this.children = {left, right}
        this.operator = op
    }

    toString() {
        return "(" + this.children.left.toString()
            + ` ${this.operator} `
            + this.children.right.toString() + ")"
    }

    getProps() {
        const left = this.children.left.getProps()
        const right = this.children.right.getProps()

        right.forEach(v => {
            if (!left.includes(v)) {
                left.push(v)
            }
        })

        return left
    }

    evaluate(propositions, assignment) {
        const left = this.children.left.evaluate(propositions, assignment)
        const right = this.children.right.evaluate(propositions, assignment)
        return this.combine(left, right);
    }

    combine() {
        console.log("Error: did not implement combination for binop")
        return false;
    }
}

class OrNode extends BinopNode {
    constructor (left, right) {
        super(left, right, "V");
    }

    combine(a, b) {
        return a || b
    }
}

class AndNode extends BinopNode {
    constructor (left, right) {
        super(left, right, "^");
    }

    combine(a, b) {
        return a && b
    }
}

class ImpliesNode extends BinopNode {
    constructor (left, right) {
        super(left, right, "->");
    }

    combine(a, b) {
        return (!a) || b
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

    getProps() {
        return [this.name]
    }

    evaluate(propositions, assignment) {
        // Find assignment in list
        const i = propositions.indexOf(this.name)

        if (i < 0 || assignment[i] === undefined) {
            console.error("Error: prop node " + this.name + " not included in assignment", propositions, assignment)
        }

        return assignment[i]
    }
}

class BoolNode extends FormulaTreeNode {
    constructor (value) {
        super();
        this.value = value;
    }

    toString() {
        return this.value ? '[T]' : '[F]';
    }

    getProps() {
        return []
    }

    evaluate() {
        return this.value
    }
}

class NegNode extends FormulaTreeNode {
    constructor (child) {
        super();
        this.children = {child};
    }

    toString() {
        return "-" + this.children.child.toString();
    }

    getProps() {
        return this.children.child.getProps()
    }

    evaluate(propositions, assignment) {
        const child = this.children.child.evaluate(propositions, assignment)
        return !child;
    }
}

export {
    FormulaTreeNode,
    OrNode,
    AndNode,
    ImpliesNode,
    NegNode,
    BoolNode,
    PropNode
}
