const generateRangedArray = (min, max) => {
  const arr = []
  for (let i = min; i <= max; i++) {
    arr.push(i)
  }
  return arr
}

module.exports = { generateRangedArray }