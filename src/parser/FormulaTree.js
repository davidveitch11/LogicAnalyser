
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

    /**
     * Return a new object in the same structure as this one
     */
    copy() {
        console.error("Error: did not define copy for this class")
        return new FormulaTreeNode()
    }

    /**
     * Converts internal structure to CNF and returns link to self
     */
    toCNF() {
        // Remove implications
        const t0 = this.removeImplications()

        // Move negations inward
        const t1 = t0.moveNegationsInward()

        // Distribute disjunctions over conjuctions
        const t2 = t1.distributeOrOverAnd()

        // Remove any double negatives and negate booleans
        const t3 = t2.simplify()

        // Convert the tree to and array of clauses
        const t4 = t3.extractCNFClauses()

        // Remove any booleans from the clauses

        // Remove any clause containing a T boolean node
        const t5 = t4.filter(clause => !clause.some(literal => (literal instanceof BoolNode) && (literal.value)))
        // Remove (F) booleans from remaining clauses
        const t6 = t5.map(clause => clause.filter(literal => !(literal instanceof BoolNode)))

        return t6
    }

    removeImplications() {
        console.error("Error: did not define removeImplications for this class")
        return this;
    }

    moveNegationsInward() {
        console.error("Error: did not define moveNegationsInward for this class")
        return this;
    }

    distributeOrOverAnd() {
        console.error("Error: did not define distributeOrOverAnd for this class")
        return this;
    }

    /**
     * Remove all double negatives and negations of boolean values
     */
    simplify() {
        console.error("Error: did not define simplify for this class")
        return this;
    }

    extractCNFClauses() {
        if (this instanceof AndNode) {
            // All children should return a list of completed clauses
            const left = this.children.left.extractCNFClauses()
            const right = this.children.right.extractCNFClauses()

            // Combine these lists into a full list
            return [...left, ...right];
        } else if (this instanceof OrNode) {
            // All children should return one clause with a list of literals
            const [left] = this.children.left.extractCNFClauses()
            const [right] = this.children.right.extractCNFClauses()

            // Combine these lists into one larger clause
            return [[...left, ...right]];
        } else {
            // Return just one clause with this in it
            return [[this]];
        }
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

    moveNegationsInward() {
        this.children.left = this.children.left.moveNegationsInward()
        this.children.right = this.children.right.moveNegationsInward()
        return this;
    }

    simplify() {
        this.children.left = this.children.left.simplify()
        this.children.right = this.children.right.simplify()
        return this;
    }
}

class OrNode extends BinopNode {
    constructor (left, right) {
        super(left, right, "V");
    }

    combine(a, b) {
        return a || b
    }

    copy() {
        return new OrNode(this.children.left.copy(), this.children.right.copy())
    }

    removeImplications() {
        this.children.left = this.children.left.removeImplications()
        this.children.right = this.children.right.removeImplications()
        return this;
    }

    distributeOrOverAnd() {
        this.children.left = this.children.left.distributeOrOverAnd()
        this.children.right = this.children.right.distributeOrOverAnd()

        if (this.children.left instanceof AndNode) {
            const oldLeft = this.children.left;

            const newLeft = new OrNode(oldLeft.children.left, this.children.right.copy())
            const newRight = new OrNode(oldLeft.children.right, this.children.right)

            const newThis = new AndNode(
                newLeft.distributeOrOverAnd(),
                newRight.distributeOrOverAnd()
            )

            return newThis;
        }

        if (this.children.right instanceof AndNode) {
            const oldRight = this.children.right

            const newLeft = new OrNode(this.children.left.copy(), oldRight.children.left)
            const newRight = new OrNode(this.children.left, oldRight.children.right)

            const newThis = new AndNode(
                newLeft.distributeOrOverAnd(),
                newRight.distributeOrOverAnd()
            )

            return newThis;
        }

        return this;
    }
}

class AndNode extends BinopNode {
    constructor (left, right) {
        super(left, right, "^");
    }

    combine(a, b) {
        return a && b
    }

    copy() {
        return new AndNode(this.children.left.copy(), this.children.right.copy())
    }

    removeImplications() {
        this.children.left = this.children.left.removeImplications()
        this.children.right = this.children.right.removeImplications()
        return this;
    }

    distributeOrOverAnd() {
        this.children.left = this.children.left.distributeOrOverAnd()
        this.children.right = this.children.right.distributeOrOverAnd()
        return this;
    }
}

class ImpliesNode extends BinopNode {
    constructor (left, right) {
        super(left, right, "->");
    }

    combine(a, b) {
        return (!a) || b
    }

    copy() {
        return new ImpliesNode(this.children.left.copy(), this.children.right.copy())
    }

    removeImplications() {
        const left = this.children.left.removeImplications()
        const right = this.children.right.removeImplications()
        return new OrNode(new NegNode(left), right);
    }
}

class LiteralNode extends FormulaTreeNode {
    constructor() {
        super();
    }

    /**
     * Check to see if this literal matches the one given.
     * Returns 1 if they are equal (e.g., b and b or -b and -b)
     * Returns -1 if they are opposite (e.g., b and -b)
     * Returns 0 if they are unequal (e.g., a and b)
     */
    matches() {
        console.error("Error: did not implement matches for this class")
        return 0;
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

    copy() {
        return new PropNode(this.name)
    }

    removeImplications() {
        return this;
    }

    moveNegationsInward() {
        return this;
    }

    distributeOrOverAnd() {
        return this;
    }

    simplify() {
        return this;
    }

    matches(compare) {
        if (compare instanceof PropNode) {
            if (compare.name === this.name) {
                return 1;
            } else {
                return 0;
            }
        }
        if (compare instanceof NegNode) {
            if (compare.children.child.name === this.name) {
                return -1;
            } else {
                return 0;
            }
        }
        return 0;
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
    
    copy() {
        return new BoolNode(this.value)
    }

    removeImplications() {
        return this;
    }

    moveNegationsInward() {
        return this;
    }

    distributeOrOverAnd() {
        return this;
    }

    simplify() {
        return this;
    }

    invert() {
        this.value = !this.value
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

    copy() {
        return new NegNode(this.children.child.copy())
    }

    removeImplications() {
        this.children.child = this.children.child.removeImplications()
        return this;
    }

    moveNegationsInward() {
        this.children.child = this.children.child.moveNegationsInward()

        if (this.children.child instanceof BinopNode) {
            let left = new NegNode(this.children.child.children.left)
            let right = new NegNode(this.children.child.children.right)

            left = left.moveNegationsInward()
            right = right.moveNegationsInward()

            let child;

            if (this.children.child instanceof AndNode) {
                child = new OrNode(left, right)
            } else if (this.children.child instanceof OrNode) {
                child = new AndNode(left, right)
            } else {
                console.error("Error: in moveNegationsInward, child of negation is unknown binop")
                child = null;
            }

            return child;
        }

        return this;
    }

    distributeOrOverAnd() {
        this.children.child = this.children.child.distributeOrOverAnd()
        return this;
    }

    simplify() {
        if (this.children.child instanceof NegNode) {
            // replace double negative

            return this.children.child.children.child.simplify();
        }

        if (this.children.child instanceof BoolNode) {
            // Invert boolean and remove negation

            this.children.child.invert()

            return this.children.child
        }

        return this;
    }

    matches(compare) {
        if (compare instanceof PropNode) {
            if (compare.name === this.children.child.name) {
                return -1;
            } else {
                return 0;
            }
        }
        if (compare instanceof NegNode) {
            if (compare.children.child.name === this.children.child.name) {
                return 1;
            } else {
                return 0;
            }
        }
        return 0;
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
