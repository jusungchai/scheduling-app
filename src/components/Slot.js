import React, { useState } from 'react'
import '../styles/Slot.css'
import Modal from 'react-bootstrap/Modal'
const { taskNames, startTimes, endTimes } = require("../data/TaskDetails")
const { createTask, deleteTasks, inRange } = require("../helpers/functions")

export default function Slot(props) {
  const { data, fullData, currentWeek, currentDay } = props
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const [task, setTask] = useState({ start: "", end: "", info: "", taskID: "" })

  const style = {
    background: data.background
  }

  const taskList = () => {
    return taskNames.map((name, i) => <button className="dropdown-item" type="button" key={i} onClick={() => setTask({ ...task, info: name })}>{name}</button>)
  }

  const startList = () => {
    return startTimes.map((time, i) => <button className="dropdown-item" type="button" key={i} onClick={() => setTask({ ...task, start: time })}>{time}</button>)
  }

  const endList = () => {
    return endTimes.map((time, i) => <button className="dropdown-item" type="button" key={i} onClick={() => setTask({ ...task, end: time })}>{time}</button>)
  }

  const handleClose = () => {
    setTask({ start: "", end: "", info: "", taskID: "" })
    setShow(false)
  }

  const headerTitle = () => {
    return data.taskID ? <Modal.Title id="modal-title-header">{`Task ID: ${data.taskID}\nStart Time: ${data.start}\nEnd Time: ${data.end + 1}\nTask: ${data.info}`}</Modal.Title> : <Modal.Title>Create Task</Modal.Title>
  }

  const fieldCheck = () => {
    if (task.start === "" || task.end === "" || task.info === "") {
      alert("Please fill out all fields")
      return false
    }
    if (task.start >= task.end) {
      alert("Task must be at least 1 hour in duration")
      return false
    }

    return true
  }

  const conflictCheck = (start, end, taskID, dayData) => {
    const conflictArray = []
    dayData.forEach((slot, i) => {
      if (slot.taskID && slot.taskID !== taskID && inRange(i, start, end - 1)) {
        conflictArray.push(slot)
      }
    })
    return [...new Set(conflictArray.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
  }

  const handleCreate = () => {
    let dayData = fullData.schedule[currentWeek][currentDay]
    if (fieldCheck()) {
      const allConflicts = conflictCheck(task.start, task.end, task.taskID, dayData)
      if (allConflicts.length === 0 || allConflicts[0].taskID === data.taskID) {
        dayData = deleteTasks([{ taskID: data.taskID }], dayData)
        dayData = createTask(task.start, task.end - 1, task.info, dayData)
        props.updateDay(dayData)
        setTask({ start: "", end: "", info: "", taskID: "" })
        setShow(false)
      } else {
        const confirm = window.confirm("There are conflicting schedule(s).\n Would you like to delete them and overwrite?")
        if (confirm) {
          dayData = deleteTasks([{ taskID: data.taskID }], dayData)
          dayData = deleteTasks(allConflicts, dayData)
          dayData = createTask(task.start, task.end - 1, task.info, dayData)
          props.updateDay(dayData)
          setTask({ start: "", end: "", info: "", taskID: "" })
          setShow(false)
        }
      }
    }
  }

  const handleDelete = () => {
    let dayData = fullData.schedule[currentWeek][currentDay]
    dayData = deleteTasks([{ taskID: data.taskID }], dayData)
    props.updateDay(dayData)
    setTask({ start: "", end: "", info: "", taskID: "" })
    setShow(false)
  }

  const modalBody = () => {
    return (
      <div id="modal-body">
        <div id="modal-time">
          <label>Start:</label>

          <div className="dropdown" id="driver-list">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: "80%" }}>
              {task.start}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {startList()}
            </div>
          </div>

          <label id="end-time-label">End:</label>
          <div className="dropdown" id="driver-list">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: "80%" }}>
              {task.end}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {endList()}
            </div>
          </div>

        </div>

        <div id="modal-info">
          <label>Info:</label>

          <div className="dropdown" id="driver-list">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: "80%" }}>
              {task.info}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {taskList()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="slot" onClick={handleShow} style={style}>
        <div id="slot-info">
          {data.info}
        </div>
      </div>

      <Modal show={show} animation={false} backdrop="static">
        <Modal.Header>
          {headerTitle()}
        </Modal.Header>
        <Modal.Body>
          {modalBody()}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleCreate}>{data.taskID ? "Edit" : "Create"}</button>
          {data.taskID ? <button className="btn btn-danger" onClick={handleDelete}>Delete</button> : null}
        </Modal.Footer>
      </Modal>
    </>
  )
}


