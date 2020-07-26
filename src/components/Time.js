import React from 'react'
import hoursArray from '../data/Hours'
import '../styles/Time.css'

export default function Time() {
  const hours = () => {
    return hoursArray.map((hour, i) => <div className="hour" key={i}>{hour}</div>)
  }

  return (
    <div className="time">
      {hours()}
    </div>
  )
}
