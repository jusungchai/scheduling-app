const createScheduleObject = () => {
  const schedule = {}
  for (let i = 1; i <= 52; i++) {
    const days = {}
    for (let j = 1; j <= 7; j++) {
      days[j] = new Array(24).fill({ start: "", end: "", info: "", taskID: "", background: "white" })
    }
    schedule[i] = days
  }

  return schedule
}

const initializeScheduler = (drivers) => {
  const infoObject = {}
  drivers.forEach(driver => {
    infoObject[driver] = {
      schedule: createScheduleObject()
    }
  })

  return infoObject
}

export { initializeScheduler }