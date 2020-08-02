import React, { useState } from 'react';
import './styles/App.css';
import drivers from './data/Drivers'
import weeks from './data/Weeks'
import reportIntervals from './data/ReportIntervals'
import Header from './components/Header'
import Day from './components/Day'
import Time from './components/Time'
import EventField from './components/EventField'
const { initializeScheduler } = require('./data/Initialize')

function App() {
  const [database, setDatabase] = useState(initializeScheduler(drivers))
  const [week, setWeek] = useState(null)
  const [driver, setDriver] = useState(null)
  const [interval, setInterval] = useState(null)

  const createCSV = () => {
    if (driver && interval) {
      console.log("hahahah")
    } else {
      alert("Please select Driver and Report Interval")
    } 
  }

  return (
    <div className="App">
      <div id="main-container">
        <div id="header">
          <Header drivers={drivers} weeks={weeks} reportIntervals={reportIntervals} setDriver={driver => setDriver(driver)} setWeek={week => setWeek(week)} setInterval={interval => setInterval(interval)} createCSV={() => createCSV()}/>
        </div>
        {
          (driver && week) ?
            <>
              <div id="top">
                <Day />
              </div>
              <div id="bot">
                <div id="left">
                  <Time />
                </div>
                <div id="right">
                  <EventField database={database[driver]} currentWeek={week} updateSchedule={updatedData => setDatabase({ ...database, [driver]: updatedData })} />
                </div>
              </div>
            </> : <div id="tutorial">Select Driver and Week to Begin</div>
        }
      </div>
    </div>
  );
}

export default App;
