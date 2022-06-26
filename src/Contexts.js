
import React from 'react';

const FormulaContext = React.createContext({formula: "", setFormula: () => {}, tree : null, error: null});

export {
    FormulaContext
};
