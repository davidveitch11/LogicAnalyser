/**
 * This function takes a CNF string and uses the DPLL algorithm recursively
 * to determine if the string is satisfiable.
 * It returns a list of human-readable strings describing its process and
 * the result it reaches.
 */
function recalculateDPLL(cnf) {
    // A list of human-readable strings for the user
    const strings = []
    const print = str => strings.push(str)
    
    // Start calculation
    const {result, assignment} = doDPLL(cnf, print)

    // Add a string for the final result
    if (result) {
        print("Formula is satisfied by " + assignment)
    } else {
        print("Formula is unsatisfiable")
    }

    return strings
}

/**
 * Recursively perform DPLL on the CNF formula until either satisfaction occurs
 * or it is determined to be unsatisfiable. It takes the formula and a print
 * function which must accept strings and returns an object with two fields:
 * result containing true (if satisfied) or false, and assignment containing an
 * array of the literals which are true in order to satisfy the formula.
 */
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

        // Used to break the loop
        let found = false;

        // Return value
        let ret = {result: false, assignment: []};

        // Iterate over all literals
        cnf.forEach(clause => clause.forEach(literal => {
            if (found) {
                return;
            }

            print("Guess using literal " + literal.toString() + " from clause {" + clause.join(",") + "}")

            // Use literal as the unit
            const nCNF = propagateUnit(newCNF, literal, print)

            // Recurse
            const {result, assignment} = doDPLL(nCNF, print)

            // Found a satisfying result, set return value and break the loops
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

    // Recurse
    const {result, assignment} = doDPLL(newCNF, print)

    // Add this propagated unit to returned assignment
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

/**
 * Return a string representing the given CNF formula
 */
function cnfToString(cnf) {
    const strings = cnf.map(clause => "{" + clause.join(",") + "}")
    return strings.join(" ")
}

export {
    recalculateDPLL
}
