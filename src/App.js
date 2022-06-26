import logo from './logo.svg';
import './App.css';
import FormulaManager from './FormulaManager';
import FormulaForm from './FormulaForm';
import FormulaDisplay from './FormulaDisplay';
import TruthTable from './TruthTable';

function App() {
  return <>
    <FormulaManager>
      {/* Form to enter the propositional formula */}
      <FormulaForm />

      {/* Something to display the raw formula as parsed */}
      <FormulaDisplay />

      {/* Truth table (if possible) for the proposition */}
      <TruthTable />
    </FormulaManager>
  </>;
}

export default App;
