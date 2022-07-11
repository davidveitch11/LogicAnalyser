
import React from 'react';

/**
 * Context used to pass the formula to all internal components.
 * Declared here are the default values.
 */
const FormulaContext = React.createContext(
    {
        formula: "",
        setFormula: () => {},
        tree : null,
        error: null,
        cnf: null,
        dpll: null
    }
);

export {
    FormulaContext
};
