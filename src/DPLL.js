import { useContext, useState } from "react";
import { FormulaContext } from "./Contexts";

function DPLL() {
    const {cnf} = useContext(FormulaContext)
    const [out, outSetter] = useState([])

    if (!cnf) {
        if (out.length > 0) {
            outSetter([])
        }

        return null
    }

    const recalculate = () => {
        const newOut = []
        const print = line => {
            newOut.push(line)
        }

        const {result, assignment} = doDPLL(cnf, print)

        if (result) {
            print("Formula is satisfied by " + assignment)
        } else {
            print("Formula is unsatisfiable")
        }
        outSetter(newOut)
    }

    return (
        <div id="dpll">
            <h2>DPLL analysis</h2>
            <button type="button" onClick={recalculate}>Perform DPLL</button>
            {out.map((line, i) => <p key={"line" + i}>{line}</p>)}
        </div>
    );
}

function doDPLL(cnf, print) {
    print("Starting iteration with CNF: " + cnfToString(cnf))

    // Check for exit condition
    if (cnf.length === 0) {
        print("Found empty formula (satisfied)")
        return {result: true, assignment: []}
    }
    if (cnf.some(clause => clause.length === 0)) {
        print("Found empty clause (contradiction)")
        return {result: false, assignment: []}
    }

    // Make copy of objects
    let newCNF = cnf.map(clause => [...clause])

    // Find unit clause (or null if no clauses are units)
    const [unit] = newCNF.find(clause => clause.length === 1) || [null]

    if (!unit) {
        // Without a unit clause, take a random guess

        print("No unit clauses found");

        let found = false;
        let ret = {result: false, assignment: []};

        cnf.forEach(clause => clause.forEach(literal => {
            if (found) {
                return;
            }

            print("Guess using literal " + literal.toString() + " from clause {" + clause.join(",") + "}")

            // Use literal as the unit
            const nCNF = propagateUnit(newCNF, literal, print)

            const {result, assignment} = doDPLL(nCNF, print)
            if (result) {
                found = true;
                ret = {result, assignment: [...assignment, literal]}
                return;
            }

            print("Backtracking literal " + literal.toString() + " from clause {" + clause.join(",") + "}")
        }))

        return ret;
    }

    // With a unit clause, perform propagation

    newCNF = propagateUnit(newCNF, unit, print);

    // const strings = newCNF.map(clause => "{" + clause.join(",") + "}")
    // lines.push(str, "new CNF: " + strings.join(" "))

    const {result, assignment} = doDPLL(newCNF, print)
    return {result, assignment: [...assignment, unit]}
}

function propagateUnit(cnf, unit, print) {
    // Remove clauses with literals which match the unit
    let removedClauses = cnf.filter(clause => clause.some(literal => literal.matches(unit) === 1))

    // Remove literals which match the unit's inverse from clauses
    let removedLiterals = cnf.filter(clause => clause.some(literal => literal.matches(unit) === -1))

    print(
        "propagating unit: " + unit.toString()
        + "; "
        + "removed " + removedClauses.length
        + " clause(s): " + cnfToString(removedClauses)
        + "; "
        + "removed unit from " + removedLiterals.length
        + " clause(s): " + cnfToString(removedLiterals)
    )

    // Perform removals
    cnf = cnf.filter(clause => !clause.some(literal => literal.matches(unit) === 1))
    cnf = cnf.map(clause => clause.filter(literal => literal.matches(unit) === 0))

    return cnf
}

function cnfToString(cnf) {
    const strings = cnf.map(clause => "{" + clause.join(",") + "}")
    return strings.join(" ")
}

export default DPLL;
