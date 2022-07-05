import './App.css';
import FormulaManager from './FormulaManager';
import FormulaForm from './FormulaForm';
import FormulaDisplay from './FormulaDisplay';
import TruthTable from './TruthTable';
import CNFDisplay from './CNFDisplay';
import DPLL from './DPLL';

function App() {
    return <>
        <Title />
        <FormulaManager>
            {/* Form to enter the propositional formula */}
            <FormulaForm />

            {/* Display of the CNF representation of the formula */}
            <CNFDisplay />

            <DPLL />

            {/* Truth table (if possible) for the proposition */}
            <TruthTable />
        </FormulaManager>
    </>;
}

function Title() {
    return <h1>Propositional Logic Analyser</h1>
}

export default App;
