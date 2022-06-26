import { useContext } from "react";
import { FormulaContext } from "./Contexts";

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
