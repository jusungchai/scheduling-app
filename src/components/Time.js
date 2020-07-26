import React from 'react'

export default function Time(props) {
  const time = props.time
  return (
    <div className="time">
      {time}
    </div>
  )
}
