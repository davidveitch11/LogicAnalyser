import { useContext, useState } from "react";
import { FormulaContext } from "./Contexts";
import FormulaDisplay from "./FormulaDisplay";

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

    return <div id="formula-input">
        <h2>Formula Input</h2>

        <p>Input your formula in propositional calculus in the form below and
            check that it has parsed correctly using the display underneath</p>

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

        {/* Something to display the raw formula as parsed */}
        <FormulaDisplay />
    </div>
}

export default FormulaForm;
