import './App.css';
import FormulaManager from './FormulaManager';
import FormulaForm from './FormulaForm';
import FormulaDisplay from './FormulaDisplay';
import TruthTable from './TruthTable';
import CNFDisplay from './CNFDisplay';
import DPLL from './DPLL';

function App() {
    return <div className='app'>
        <h1>Propositional Logic Analyser</h1>
        <div className='table'>
            <FormulaManager>
                <div className="row">
                    <div className='col'>
                        {/* Form to enter the propositional formula */}
                        <FormulaForm />

                        {/* Display of the CNF representation of the formula */}
                        <CNFDisplay />

                        {/* Section to perform DPLL processing of the formula */}
                        <DPLL />
                    </div>
                    <div className='col'>
                        {/* Truth table (if possible) for the proposition */}
                        <TruthTable />
                    </div>
                </div>
            </FormulaManager>
        </div>
    </div>;
}

export default App;
