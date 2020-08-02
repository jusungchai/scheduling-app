import React from 'react'
import Slot from './Slot'
import '../styles/EventField.css'

export default function EventField(props) {
  const { database, currentWeek } = props

  const createDaySchedule = (currentWeek, currentDay, timeArray) => {
    return timeArray.map((timeSlot, i) => {
      const data = database.schedule[currentWeek][currentDay][i];
      return <Slot fullData={database} data={data} key={i} currentWeek={currentWeek} currentDay={currentDay} updateDay={dayData => updateSchedule(dayData, currentWeek, currentDay)} />
    })
  }

  const updateSchedule = (dayData, currentWeek, currentDay) => {
    database.schedule[currentWeek][currentDay] = dayData
    props.updateSchedule(database)
  }

  const renderCalendar = () => {
    const scheduleArray = []
    for (const [day, timeArray] of Object.entries(database.schedule[currentWeek])) {
      scheduleArray.push(
        <div key={day} className="daylist">
          {createDaySchedule(currentWeek, parseInt(day), timeArray)}
        </div>
      )
    }
    return scheduleArray
  }

  return (
    <div id="schedulebox">
      {renderCalendar()}
    </div>
  )
}
