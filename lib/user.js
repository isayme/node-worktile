/**
 * 获取用户信息
 * @memberof Worktile#users
 */
function profile () {
  return this.request({
    uri: '/v1/user/profile'
  })
}

/**
 * 用户(user)接口
 * @namespace users
 * @memberof Worktile#
 */
module.exports = {
  profile: profile
}
