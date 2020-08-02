import React, { useState } from 'react'
import '../styles/Header.css'

export default function Header(props) {
  const [driver, setDriver] = useState("Select Driver")
  const [week, setWeek] = useState("Select Week")
  const [reportInterval, setReportInterval] = useState("Select Interval")

  const { drivers, weeks, reportIntervals } = props

  const driversList = () => {
    return drivers.map((name, i) => <button className="dropdown-item" type="button" key={i} onClick={() => { setDriver(name); props.setDriver(name) }}>{name}</button>)
  }

  const weeksList = () => {
    return weeks.map((week, i) => <button className="dropdown-item" type="button" key={i} onClick={() => { setWeek(`Week ${week}`); props.setWeek(week) }}>{`Week ${week}`}</button>)
  }

  const reportIntervalsList = () => {
    return reportIntervals.map((interval, i) => <button className="dropdown-item" type="button" key={i} onClick={() => { setReportInterval(`${interval} Days`); props.setInterval(interval) }}>{`${interval} Days`}</button>)
  }

  const createCSV = () => {    
    props.createCSV()    
  }

  return (
    <div id="inner-header">
      <div className="dropdown" id="driver-list">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: "50%" }}>
          {driver}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          {driversList()}
        </div>
      </div>

      <div className="dropdown" id="week-list">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: "50%" }}>
          {week}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2" id="week-dropdown">
          {weeksList()}
        </div>
      </div>

      <div id="report-container">
        <button className="btn btn-secondary" type="button" onClick={createCSV} style={{ width: "40%", marginRight: "1em" }}>
          Download Schedule
        </button>

        <div className="dropdown" id="report-interval-list" style={{ width: "30%" }}>
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: "100%" }}>
            {reportInterval}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {reportIntervalsList()}
          </div>
        </div>
      </div>
    </div>
  )
}
