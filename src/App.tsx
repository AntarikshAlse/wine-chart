import './App.css'
import LineChart from './Components/LineChart';
import BarChart from './Components/BarChart';

function App() {

  return (
    <div className="App">
      <h1>Wine Data Visualization</h1>
      <div>
        <h2>Line Chart</h2>
        <div className="lineChart"><LineChart/></div>
      </div>
      <div>
        <h2>Bar Chart</h2>
       <div className="barChart"><BarChart/></div>
    </div>
    </div>
  )
}

export default App
