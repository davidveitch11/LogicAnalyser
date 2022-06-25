/**
 * Form for entering a new formula string
 */

import { useContext, useState } from "react";
import { FormulaContext } from "./Contexts";

function FormulaForm() {
    const {formula, setFormula} = useContext(FormulaContext)
    const [value, setValue] = useState(formula)

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormula(value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Formula:
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default FormulaForm;
