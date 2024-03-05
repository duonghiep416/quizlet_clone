const crypto = require('crypto')
const fs = require('fs')
function getFileChecksum(filePath) {
  const fileData = fs.readFileSync(filePath)
  return crypto.createHash('md5').update(fileData).digest('hex')
}

module.exports = {
  getFileChecksum
}
