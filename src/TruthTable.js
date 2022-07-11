import { useContext } from "react";
import { FormulaContext } from "./Contexts";
import WhatIsThisBtn from "./WhatIsThisBtn";

// The maximum number of (different) propositions that can be used before the
// number of possible assignments grows too large.
// Set to five, at most 32 (i.e., 2^5) assignments can be given.
const MAX_TABLE = 5;

function TruthTable() {
    return <div id="truth-table">
        <h2>Truth Table</h2>

        <WhatIsThisBtn>
            <p>
                The truth table shows all possible assignments for the propositional
                variables in the formula and the evaluation of the formula using these
                assignments.
            </p>
        </WhatIsThisBtn>

        <TruthTableInner />
    </div>
}

/**
 * Component for showing the truth table for a given formula tree.
 * It finds all the different propositional variables and produces a row for every
 * assignment of those variables along with an evaluation of the formula using
 * those assignments.
 * If too many propositions are present, the number of rows would be too much, so
 * no table is shown.
 * If there are no propositions, there will be just one evaluation, so no table is
 * shown.
 */
function TruthTableInner() {
    const {tree} = useContext(FormulaContext)

    // Don't display if no formula available
    if (!tree) {
        return null;
    }

    // Get an array of all unique propositional variables used
    const props = tree.getProps()

    // If no props, there is just one evaluation so that is all that is displayed
    if (props.length === 0) {
        const value = tree.evaluate([], [])
        return <p>No truth table as no propositions to give assignments.
            General evaluation is {value ? "true" : "false"}</p>
    }

    // If there are too many props, this cannot be displayed
    if (props.length > MAX_TABLE) {
        return <p>No truth table as no more than {MAX_TABLE}
            &nbsp;different propositions can be used in the formula</p>
    }

    // Get an array of assignments (each of which is an array of booleans) and
    // add an evaluation to the end of each
    const assignments = getAssignments(props.length)
    addTotals(props, assignments, tree)

    return (
        <table>
            <TableHead props={props} />
            <tbody>
                {assignments.map((a, i) => <TableRow assignment={a} key={"tr" + i} />)}
            </tbody>
        </table>
    )
}

/**
 * The head of the table displays as a list of propositional variables and a final
 * column for evaluation.
 */
function TableHead({props})  {
    return (
        <thead>
            <tr>
                {props.map((prop, i) => <th key={"th" + i}>{prop}</th>)}
                <th>Evaluation</th>
            </tr>
        </thead>
    )
}

/**
 * Return all the possible assignments for n propositional variables.
 */
function getAssignments(n) {
    // Base case - no assignments
    if (n === 1) {
        return [[false], [true]]
    }

    // Recursive case
    const assignments = getAssignments(n - 1)

    // Use the assignments for n-1 props and append true and false to each
    const f = assignments.map(a => [false, ...a])
    const t = assignments.map(a => [true, ...a])

    // Combine arrays and return 
    return [...f, ...t]
}

/**
 * Takes a list of propositional variables, a list of assignments for those props
 * and a formula tree and adds to each assignment an extra value that represents
 * the evaluation of the formula for that assignment.
 */
function addTotals(props, assignments, tree) {
    assignments.forEach(assignment => {
        const total = tree.evaluate(props, assignment)
        assignment.push(total)
    })
}

/**
 * A table row consists of the truth values for that assignment/evaluation
 */
function TableRow({assignment}) {
    return (
        <tr>
            {assignment.map((v, i) => (
                <td key={"td" + i}>{v ? "T" : "F"}</td>
            ))}
        </tr>
    )
}

export default TruthTable;
