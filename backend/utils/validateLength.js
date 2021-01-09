const e = require('express')

const validateLength = (key) => {
  if (key.length == 15) {
    return true
  } else {
    return false
  }
}

module.exports = validateLength