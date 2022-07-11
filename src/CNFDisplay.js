import { useContext } from "react";
import { FormulaContext } from "./Contexts";
import WhatIsThisBtn from "./WhatIsThisBtn";

function CNFDisplay() {
    const {cnf} = useContext(FormulaContext)

    if (!cnf) {
        return null;
    }
    
    const cnf_strings = cnf.map(clause => "{" + clause.join(",") + "}")
    const out = cnf_strings.join(" ")
    
    return <div id="cnf-display">
        <h2>CNF Representation</h2>

        <p>This Formula: {out}</p>

        <WhatIsThisBtn>
            <p>
                CNF (or Conjunctive Normal Form) is a way of reresenting any proposition
                by writing an equivalent formula with stricter rules. The 'AND' operator
                can only be used in the outer most, followed by 'OR' and finally atomic
                literals (e.g., 'p' or 'NOT q').
            </p>
            <p>
                This creates the effect of having one list made up of lists of atomic
                literals where each sub-list must contain one literal which evaluates
                to true for the original proposition to be true.
            </p>
            <p>
                An example of this starts with the formula '(p IMPLIES NOT q) ^ p' which can
                only be satisfied if p is true and q is false. This can be written as
                '((NOT p) OR (NOT q)) AND (p)' or in the short-form: [-p, -q] [p]
            </p>
        </WhatIsThisBtn>
    </div>
}

export default CNFDisplay;
