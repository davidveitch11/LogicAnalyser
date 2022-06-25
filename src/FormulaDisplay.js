import { useContext } from "react";
import { FormulaContext } from "./Contexts";

function FormulaDisplay() {
    const {tree} = useContext(FormulaContext)

    return <p>Formula as Parsed: {tree.toString()}</p>
}

export default FormulaDisplay;
