import React, { useState } from 'react';
import './styles/App.css';
import drivers from './data/Drivers'
import weeks from './data/Weeks'
import reportIntervals from './data/ReportIntervals'
import Header from './components/Header'
import Day from './components/Day'
import Time from './components/Time'
const { initializeScheduler } = require('./data/Initialize')

function App() {
  const [database, setDatabase] = useState(initializeScheduler(drivers))
  const [week, setWeek] = useState(null)
  const [driver, setDriver] = useState(null)
  const [interval, setInterval] = useState(null)

  console.log("name", driver)
  console.log("week", week)
  console.log("interval", interval)

  console.log(database)
  return (
    <div className="App">
      <div id="main-container">
        <div id="header">
          <Header drivers={drivers} weeks={weeks} reportIntervals={reportIntervals} setDriver={driver => setDriver(driver)} setWeek={week => setWeek(week)} setInterval={interval => setInterval(interval)} />
        </div>
        <div id="top">
          <Day />
        </div>
        <div id="bot">
          <div id="left">
            <Time />
          </div>
          <div id="right">
            generate events here
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
