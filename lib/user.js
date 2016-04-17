/**
 * 获取用户信息
 * @param {requestCallback} [callback]
 * @memberof Worktile#users
 */
function profile (callback) {
  return this.request({
    uri: '/v1/user/profile'
  }, callback)
}

/**
 * 用户(user)接口
 * @namespace users
 * @memberof Worktile#
 */
module.exports = {
  profile: profile
}
