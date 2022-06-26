import { useContext } from "react";
import { FormulaContext } from "./Contexts";

/**
 * Component to display the current formula as parsed.
 * This is different from showing the raw text as this will indicate using
 * brackets exactly how nodes in the formula tree are nested.
 * Will also display any error messages.
 */
function FormulaDisplay() {
    const {tree, error} = useContext(FormulaContext)

    if (error) {
        return <p>Error: {error}</p>
    }

    if (!tree) {
        return <p>No Formula Entered</p>
    }

    return <p>Formula as Parsed: {tree.toString()}</p>
}

export default FormulaDisplay;
