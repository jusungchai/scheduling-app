const generateRangedArray = (min, max) => {
  const arr = []
  for (let i = min; i <= max; i++) {
    arr.push(i)
  }
  return arr
}

const generateTaskID = () => {
  return (new Date()).toISOString()
}

const generateColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const createTask = (start, end, info, data) => {
  const taskID = generateTaskID()
  const background = generateColor()
  const newData = data.map((slot, i) => {
    if (i >= start && i <= end) {
      return { start, end, info, taskID, background }
    }
    return slot
  })
  return newData
}

const deleteTasks = (conflictsArray, dayData) => {
  conflictsArray.forEach(conflict => {
    dayData.forEach((slot, i) => {
      if (slot.taskID === conflict.taskID) {
        dayData[i] = { taskID: "", start: i, end: "", info: "", background: "white" }
      }
    })
  })
  return dayData
}

const inRange = (val, start, end) => {
  return ((val - start) * (val - end) <= 0)
}

module.exports = { generateRangedArray, createTask, deleteTasks, inRange }