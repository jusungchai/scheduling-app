import React from 'react'
import daysArray from '../data/Days'
import '../styles/Day.css'

export default function Day() {
  const days = () => {
    return daysArray.map((day, i) => <div className="x-axis-days" key={i}>{day.toUpperCase()}</div>)
  }

  return (
    <div className="day">
      <div className="x-axis-days" id="empty-block">Day/Time(24H)</div>
      {days()}
    </div>
  )
}
