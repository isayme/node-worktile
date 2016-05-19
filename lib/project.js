/**
 * 获取用户所有项目
 * @memberof Worktile#projects
 * @see {@link https://open.worktile.com/wiki/projects.html}
 */
function list () {
  return this.request({
    uri: '/v1/projects'
  })
}

/**
 * 获取项目详情
 * @memberof Worktile#projects
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @see {@link https://open.worktile.com/wiki/project.html}
 */
function get (params) {
  return this.request({
    uri: '/v1/projects/' + params.pid
  })
}

/**
 * 获取项目成员
 * @memberof Worktile#projects
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @see {@link https://open.worktile.com/wiki/project_members.html}
 */
function getMembers (params) {
  return this.request({
    uri: '/v1/projects/' + params.pid + '/members'
  })
}

/**
 * 获取项目成员
 * @memberof Worktile#projects
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {string} params.uid - 成员uid
 * @param {number} params.role - 成员角色
 * @see {@link https://open.worktile.com/wiki/project_addMember.html}
 */
function addMemeber (params) {
  return this.request({
    method: 'POST',
    uri: '/v1/projects/' + params.pid + '/members',
    body: {
      uid: params.uid,
      role: params.role
    }
  })
}

/**
 * 项目移除成员
 * @memberof Worktile#projects
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {string} params.uid - 成员uid
 * @see {@link https://open.worktile.com/wiki/project_removeMember.html}
 */
function removeMemeber (params) {
  return this.request({
    method: 'DELETE',
    uri: '/v1/projects/' + params.pid + '/members/' + params.uid
  })
}

/**
 * 项目(project)接口
 * @namespace projects
 * @memberof Worktile#
 */
module.exports = {
  list: list,
  get: get,
  getMembers: getMembers,
  addMemeber: addMemeber,
  removeMemeber: removeMemeber
}
