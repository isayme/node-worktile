var Client = require('../')

var access_token = process.env.WORKTILE_ACCESS_TOKEN
var baseUrl = process.env.WORKTILE_BASEURL || 'https://api.worktile.com'

var client = new Client({
  access_token: access_token,
  baseUrl: baseUrl
})

process.on('unhandledRejection', function (reason, promise) {
  console.log('promise rejected:', reason, promise)
})

module.exports = client
