function profile (callback) {
  return this.request({
    uri: '/v1/user/profile'
  }, callback)
}

module.exports = {
  profile: profile
}
