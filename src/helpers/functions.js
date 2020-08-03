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

const reduceScheule = (schedule => {
  const copy = JSON.parse(JSON.stringify(schedule))
  const result = []
  for (const [week, days] of Object.entries(copy)) {
    for (const [day, data] of Object.entries(days)) {
      const array = []
      data.forEach(slot => {
        if (slot.taskID) {
          array.push(slot)
        }
      })
      result.push([...new Set(array.map(o => JSON.stringify(o)))].map(s => JSON.parse(s)))
    }
  }

  return result
})

const generateDataArray = (interval, schedule) => {
  const result = []
  while (schedule.length > 0) {
    let counter = 0
    const temp = []
    while (counter < interval) {
      const item = schedule.shift()
      temp.push(item)
      counter++
    }
    counter = 0
    result.push(temp)
  }
  return result
}

const generateTaskCountArray = (data) => {
  return data.map(interval => {
    const taskCounter = {
      "Pick Up": 0,
      "Drop Off": 0,
      "Other": 0
    }
    interval.forEach(day => {
      day.forEach(task => {
        taskCounter[task.info]++
      })
    })
    return taskCounter
  })
}

const generateCSVData = (driver, interval, data) => {
  const csvData = [
    ["Driver", driver],
    ["Time-Frame", "Pick Up", "Drop Off", "Other"]
  ]
  
  if (interval !== "Select Interval" && data) {
    const reducedSchedule = reduceScheule(data.schedule)
    const dataArray = generateDataArray(interval, reducedSchedule)
    const taskCountArray = generateTaskCountArray(dataArray)
    let start = 1
    taskCountArray.forEach(elm => {
      const row = [`Day ${start} - Day ${start + interval}`, elm["Pick Up"], elm["Drop Off"], elm["Other"]]
      start += interval
      csvData.push(row)
    })
  }

  return csvData
}

export { generateRangedArray, createTask, deleteTasks, inRange, generateCSVData }