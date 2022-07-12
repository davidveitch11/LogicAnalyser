import { useContext, useState } from "react";
import { FormulaContext } from "./Contexts";
import FormulaDisplay from "./FormulaDisplay";
import WhatIsThisBtn from "./WhatIsThisBtn";

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

        <WhatIsThisBtn>
            <p>
                Input your formula in propositional calculus in the form below and
                check that it has parsed correctly using the display underneath.
                Use the table below as the key for the symbols.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Symbol Name</th>
                        <th>Representation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>AND</td>
                        <td>'^'</td>
                    </tr>
                    <tr>
                        <td>OR</td>
                        <td>'V'</td>
                    </tr>
                    <tr>
                        <td>IMPLIES</td>
                        <td>'-&gt;'</td>
                    </tr>
                    <tr>
                        <td>NOT</td>
                        <td>'-'</td>
                    </tr>
                    <tr>
                        <td>TRUE</td>
                        <td>'T'</td>
                    </tr>
                    <tr>
                        <td>FALSE</td>
                        <td>'F'</td>
                    </tr>
                </tbody>
            </table>
            <p>
                Propositions are any combination of upper or lower case letters (excluding 'V', 'T', and 'F')
            </p>
        </WhatIsThisBtn>
    </div>
}

export default FormulaForm;
