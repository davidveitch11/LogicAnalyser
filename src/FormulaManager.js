
import { useState } from 'react';
import {FormulaContext} from './Contexts';
import antlr4 from 'antlr4';
import { LogicLexer, LogicParser, MyLogicListener } from './parser';

function FormulaManager({children}) {
    const [formula, formulaSetter] = useState("");
    const [tree, treeSetter] = useState(null);
    const [error, errorSetter] = useState(null)

    const setFormula = formula => {
        formulaSetter(formula)
        errorSetter(null)
        const newTree = getTree(formula, errorSetter)
        treeSetter(newTree)
    }

    const value = {formula, setFormula, tree, error}

    return (
        <FormulaContext.Provider value={value}>
            {children}
        </FormulaContext.Provider>
    );
}

class ErrorListener extends antlr4.error.ErrorListener {
    constructor(onError) {
        super()
        this.onError = onError
        this.hadError = false;
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg, err) {
        this.onError("Syntax error at position " + column + ": " + msg)
        this.hadError = true;
    }
}

function getTree(formula, onError) {
    const lexer = new LogicLexer(new antlr4.InputStream(formula))
    const parser = new LogicParser(new antlr4.CommonTokenStream(lexer))
    parser.buildParseTrees = true;

    const errorListener = new ErrorListener(onError)

    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);

    const buildTree = parser.formula()

    if (errorListener.hadError) {
        return null;
    }

    const listener = new MyLogicListener()
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, buildTree);
    return listener.getTree();
}

export default FormulaManager;
