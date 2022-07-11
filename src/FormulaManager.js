
import { useState } from 'react';
import {FormulaContext} from './Contexts';
import antlr4 from 'antlr4';
import { LogicLexer, LogicParser, MyLogicListener } from './parser';
import { recalculateDPLL } from './DPLLCalculations';

/**
 * Component responsible for managing the formula.
 * It will render as any children it is given.
 * It will provide a context with the text and tree representation of the formula
 * as well as any error strings and a method for setting a new string formula.
 * When a new formula is set, it will parse it and store the new tree representation,
 * as well as the CNF representation of the same formula
 */
function FormulaManager({children}) {
    // String representation of the formula
    const [formula, formulaSetter] = useState("");
    // Tree representation of the same formula (if available)
    const [tree, treeSetter] = useState(null);
    // Error string if parsing failed
    const [error, errorSetter] = useState(null)
    // CNF representation of the formula (if available)
    const [cnf, cnfSetter] = useState(null)
    // Strings from the calculation using DPLL
    const [dpll, dpllSetter] = useState(null)

    const setFormula = formula => {
        // Save the string representation
        formulaSetter(formula)

        // Remove previous errors
        errorSetter(null)

        if (formula === "") {
            treeSetter(null)
            cnfSetter(null)
            dpllSetter(null)
            return;
        }

        // Attempt to parse the new string formula and save the resultant tree/errors
        const newTree = getTree(formula, errorSetter)
        treeSetter(newTree)

        if (newTree === null) {
            return;
        }

        // Convert the tree into CNF
        const cnfRep = newTree.copy().toCNF()
        cnfSetter(cnfRep)

        // Use DPLL and collect the information strings
        const dpllStrings = recalculateDPLL(cnfRep)
        dpllSetter(dpllStrings)
    }

    const value = {formula, setFormula, tree, error, cnf, dpll}

    return (
        <FormulaContext.Provider value={value}>
            {children}
        </FormulaContext.Provider>
    );
}

/**
 * Class responsible for directing error messages away from the console and to
 * this program's method for reporting errors
 */
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

/**
 * Attempt to parse the string formula given using the parser, returning the
 * tree representation as parser/FormulaTreeNode objects.
 * On error the second argument will be given an error string and null will
 * be returned.
 */
function getTree(formula, onError) {
    // Setup method for handling errors
    const errorListener = new ErrorListener(onError)

    // Setup parser
    const lexer = new LogicLexer(new antlr4.InputStream(formula))
    lexer.removeErrorListeners()
    lexer.addErrorListener(errorListener)
    const parser = new LogicParser(new antlr4.CommonTokenStream(lexer))
    parser.buildParseTrees = true;
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);

    // Attempt to parse the formula
    const buildTree = parser.formula()

    // Check for errors
    if (errorListener.hadError) {
        return null;
    }

    // Convert the parser's build tree into a FormulaTree representation using
    // this program's listener class
    const listener = new MyLogicListener()
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, buildTree);
    return listener.getTree();
}

export default FormulaManager;
