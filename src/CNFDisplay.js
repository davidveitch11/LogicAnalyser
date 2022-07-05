import { useContext } from "react";
import { FormulaContext } from "./Contexts";

function CNFDisplay() {
    const {cnf} = useContext(FormulaContext)

    if (!cnf) {
        return null;
    }
    
    const cnf_strings = cnf.map(clause => "{" + clause.join(",") + "}")

    return <p>CNF representation: {cnf_strings.join(" ")}</p>;
}

export default CNFDisplay;
