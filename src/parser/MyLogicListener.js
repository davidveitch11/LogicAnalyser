import { AndNode, BoolNode, ImpliesNode, NegNode, OrNode, PropNode } from "./FormulaTree";
import LogicListener from "./LogicListener";

export default class MyLogicListener extends LogicListener {
    getTree() {
        return this.pop();
    }

    constructor() {
        super()

        this.stack = []
    }

    push(v) {
        this.stack.push(v)
    }

    pop() {
        return this.stack.pop()
    }

    exitOp_expr(ctx) {
        if (ctx.op()) {
            const op = ctx.op()

            const right = this.pop();
            const left = this.pop();

            if (op.AND()) {
                this.push(new AndNode(left, right))
            } else if (op.OR()) {
                this.push(new OrNode(left, right))
            } else if (op.IMPLIES()) {
                this.push(new ImpliesNode(left, right))
            }
        }
    }

    exitNeg_expr(ctx) {
        if (ctx.NOT()) {
            const child = this.pop();
            this.push(new NegNode(child))
        }
    }

    exitValue(ctx) {
        if (ctx.TRUE() || ctx.FALSE()) {
            const v = ctx.TRUE() ? true : false
            this.push(new BoolNode(v))
        } else if (ctx.PROP()) {
            this.push(new PropNode(ctx.PROP().toString()))
        }
    }
}
