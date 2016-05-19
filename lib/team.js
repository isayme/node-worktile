/**
 * 获取用户所在的团队
 * @memberof Worktile#teams
 * @see {@link https://open.worktile.com/wiki/teams.html}
 */
function list () {
  return this.request({
    uri: '/v1/teams'
  })
}

/**
 * 获取团队信息
 * @memberof Worktile#teams
 * @param {object} params - 参数
 * @param {string} params.team_id - 团队team_id
 * @see {@link https://open.worktile.com/wiki/team_info.html}
 */
function get (params) {
  return this.request({
    uri: '/v1/teams/' + params.team_id
  })
}

/**
 * 获取团队成员
 * @memberof Worktile#teams
 * @param {object} params - 参数
 * @param {string} params.team_id - 团队team_id
 * @see {@link https://open.worktile.com/wiki/team_members.html}
 */
function getMembers (params) {
  return this.request({
    uri: '/v1/teams/' + params.team_id + '/members'
  })
}

/**
 * 获取团队所有项目
 * @memberof Worktile#teams
 * @param {object} params - 参数
 * @param {string} params.team_id - 团队team_id
 * @see {@link https://open.worktile.com/wiki/team_projects.html}
 */
function getProjects (params) {
  return this.request({
    uri: '/v1/teams/' + params.team_id + '/projects'
  })
}

/**
 * 团队(team)接口
 * @namespace teams
 * @memberof Worktile#
 */
module.exports = {
  list: list,
  get: get,
  getMembers: getMembers,
  getProjects: getProjects
}
