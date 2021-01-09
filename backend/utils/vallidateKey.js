const e = require("express")

const validateKey = (key) => {
  // <123ASD>
  if(key[0] == 1 && key[key.length - 1] == 'D'){
    return true
  } else {
    return false
  }
}

module.exports = validateKey