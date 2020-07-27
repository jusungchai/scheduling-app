const createScheduleObject = () => {
  const schedule = {}
  for (let i = 1; i <= 52; i++) {
    const days = {}
    for (let j = 1; j <= 7; j++) {
      days[`d${j}`] = new Array(24)
    }
    schedule[`w${i}`] = days
  }
  return schedule
}

const initializeScheduler = (drivers) => {
  const infoArray = []
  drivers.forEach((driver) => {
    infoArray.push({
      name: driver,
      schedule: createScheduleObject()
    })
  })
  return infoArray
}

module.exports = { initializeScheduler }