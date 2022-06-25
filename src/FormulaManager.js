
import { useState } from 'react';
import {FormulaContext} from './Contexts';
import antlr4 from 'antlr4';
import { OrNode, PropNode } from './FormulaTree';

function FormulaManager({children}) {
    const [formula, setter] = useState("");
    const setFormula = formula => {
        setter(formula)
    }
    const tree = new OrNode(new PropNode("a"), new PropNode("b"))
    const value = {formula, setFormula, tree}

    return (
        <FormulaContext.Provider value={value}>
            {children}
        </FormulaContext.Provider>
    );
}

export default FormulaManager;
