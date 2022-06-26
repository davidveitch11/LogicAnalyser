import { useContext, useState } from "react";
import { FormulaContext } from "./Contexts";

/**
 * Form used to enter a new formula into the system.
 */
function FormulaForm() {
    // Get the global formula state first
    const {formula, setFormula} = useContext(FormulaContext)

    // Use internal state to hold values before the submit button is clicked
    const [value, setValue] = useState(formula)

    // Only update global state when the form is submitted to avoid parsing
    // intermediate values
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormula(value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Formula:
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default FormulaForm;
