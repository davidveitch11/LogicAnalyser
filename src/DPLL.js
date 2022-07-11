import { useContext } from "react";
import { FormulaContext } from "./Contexts";
import WhatIsThisBtn from "./WhatIsThisBtn";

/**
 * This component will display the results of DPLL analysis on the formula parsed.
 * See DPLLCalculations for details
 */
function DPLL() {
    const {dpll} = useContext(FormulaContext)

    // Dont display if nothing available
    if (!dpll) {
        return null;
    }

    return (
        <div id="dpll">
            <h2>DPLL analysis</h2>

            {/* Explain to user what this does */}
            <WhatIsThisBtn>
                <p>
                    DPLL is an algorithm for determining if a proposition is
                    satisfiable and finding and least one satisfying assignment.
                </p>
                <p>
                    The first step is to convert the formula to CNF (see above).
                    Once this has been done DPLL performs 'unit propagation' as
                    far as it can. This involves finding a 'unit' - a clause
                    containing just on literal so that any assignment must have
                    literal be true - and removing any clause containing the same
                    literal - since the literal is true, the clause is satisfied -
                    and removing the negation of the literal from anywhere else - 
                    since it will be false, it cannot satisfy those clauses.
                </p>
                <p>
                    If there are no units, one must be chosen by selecting a random
                    literal and assuming it is true, propagating it and continuing
                    to see if an assignment can be found, and backtracking and
                    choosing a different literal otherwise.
                </p>
                <p>
                    If the formula is emptied - no more clauses - then it is satisfied.
                    If the formula contains an empty clause then no assignment will
                    satisfy it, so the formula is unsatisfiable.
                </p>
            </WhatIsThisBtn>

            {/* Display the lines of text in DPLL as rows */}
            {dpll.map((line, i) => <p key={"line" + i}>{line}</p>)}
        </div>
    );
}

export default DPLL;
