import './App.css';
import Gragh from './Components/gragh/Gragh';
import Table from './Components/table/Table';

function App() {
  return (
    <div className="App row justify-content-center align-items-center">
      <div className='col-md-5'>
        <Table/>
      </div>
      <div className='col-md-5'>
        <Gragh/>
      </div>
    </div>
  );
}

export default App;
