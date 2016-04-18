/**
 * 获取用户所有项目
 * @memberof Worktile#projects
 * @param {requestCallback} [callback]
 * @see {@link https://open.worktile.com/wiki/projects.html}
 */
function list (callback) {
  return this.request({
    uri: '/v1/projects'
  }, callback)
}

/**
 * 获取项目详情
 * @memberof Worktile#projects
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {requestCallback} [callback]
 * @see {@link https://open.worktile.com/wiki/project.html}
 */
function get (params, callback) {
  return this.request({
    uri: '/v1/projects/' + params.pid
  }, callback)
}

/**
 * 获取项目成员
 * @memberof Worktile#projects
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {requestCallback} [callback]
 * @see {@link https://open.worktile.com/wiki/project_members.html}
 */
function getMembers (params, callback) {
  return this.request({
    uri: '/v1/projects/' + params.pid + '/members'
  }, callback)
}

/**
 * 获取项目成员
 * @memberof Worktile#projects
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {string} params.uid - 成员uid
 * @param {number} params.role - 成员角色
 * @param {requestCallback} [callback]
 * @see {@link https://open.worktile.com/wiki/project_addMember.html}
 */
function addMemeber (params, callback) {
  return this.request({
    method: 'POST',
    uri: '/v1/projects/' + params.pid + '/members',
    body: {
      uid: params.uid,
      role: params.role
    }
  }, callback)
}

/**
 * 项目移除成员
 * @memberof Worktile#projects
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {string} params.uid - 成员uid
 * @param {requestCallback} [callback]
 * @see {@link https://open.worktile.com/wiki/project_removeMember.html}
 */
function removeMemeber (params, callback) {
  return this.request({
    method: 'DELETE',
    uri: '/v1/projects/' + params.pid + '/members/' + params.uid
  }, callback)
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
