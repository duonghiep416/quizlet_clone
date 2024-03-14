const bcrypt = require('bcrypt')
module.exports = {
  generate: (password) => bcrypt.hashSync(password, 10),
  compare: (password, hash) => bcrypt.compareSync(password, hash)
}
