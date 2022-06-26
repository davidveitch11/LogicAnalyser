import { useContext } from "react";
import { FormulaContext } from "./Contexts";

function TruthTable() {
    const {tree} = useContext(FormulaContext)

    if (!tree) {
        return null;
    }

    const props = tree.getProps()

    if (props.length === 0) {
        const value = tree.evaluate([], [])
        return <p>No truth table as no propositions to give assignments.
            General evaluation as {value ? "true" : "false"}</p>
    }

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

function TableHead({props})  {
    return (
        <thead>
            <tr>
                {props.map((prop, i) => <th key={"th" + i}>{prop}</th>)}
                <th>Out</th>
            </tr>
        </thead>
    )
}

function getAssignments(n) {
    // Base case - no assignments
    if (n === 1) {
        return [[false], [true]]
    }

    const assignments = getAssignments(n - 1)

    const f = assignments.map(a => [false, ...a])
    const t = assignments.map(a => [true, ...a])

    return [...f, ...t]
}

function addTotals(props, assignments, tree) {
    assignments.forEach(assignment => {
        const total = tree.evaluate(props, assignment)
        assignment.push(total)
    })
}

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
