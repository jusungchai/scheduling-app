import React from 'react';
import './styles/App.css';
import drivers from './data/Drivers'
import weeks from './data/Weeks'
import reportIntervals from './data/ReportIntervals'
import Header from './components/Header'
import Day from './components/Day'

function App() {
  const listOfDrivers = drivers.map((d) => d.name)
  return (
    <div className="App">
      <div id="main-container">
        <div id="header">
          <Header listOfDrivers={listOfDrivers} weeks={weeks} reportIntervals={reportIntervals} />
        </div>
        <div id="top">
          <Day />
        </div>
        <div id="bot">
          <div id="left">
            {/* {generate time here} */}
          </div>
          <div id="right">
            {/* {generate events here} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
