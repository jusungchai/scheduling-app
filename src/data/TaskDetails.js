const { generateRangedArray } = require('../helpers/functions')

const taskNames = ["Pick Up", "Drop Off", "Other"]
const startTimes = generateRangedArray(0, 23)
const endTimes = generateRangedArray(1, 24)

export { taskNames, startTimes, endTimes }