import logo from './logo.svg';
import './App.css';
import FormulaManager from './FormulaManager';
import FormulaForm from './FormulaForm';
import FormulaDisplay from './FormulaDisplay';
import TruthTable from './TruthTable';

function App() {
  return <>
    <FormulaManager>
      <FormulaForm />
      <FormulaDisplay />
      <TruthTable />
    </FormulaManager>
  </>;
}

export default App;
