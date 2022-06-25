import logo from './logo.svg';
import './App.css';
import FormulaManager from './FormulaManager';
import FormulaForm from './FormulaForm';
import FormulaDisplay from './FormulaDisplay';

function App() {
  return <>
    <FormulaManager>
      <FormulaForm />
      <FormulaDisplay />
    </FormulaManager>
  </>;
}

export default App;
