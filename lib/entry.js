/**
 * 获取项目的任务组列表
 * @memberof Worktile#entries
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @see {@link https://open.worktile.com/wiki/entries.html}
 */
function get (params) {
  return this.request({
    uri: '/v1/entries',
    qs: {
      pid: params.pid
    }
  })
}

/**
 * 创建任务组
 * @memberof Worktile#entries
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {string} params.name - 任务组名称
 * @see {@link https://open.worktile.com/wiki/add_entry.html}
 */
function create (params) {
  return this.request({
    method: 'POST',
    uri: '/v1/entry',
    body: {
      name: params.name
    },
    qs: {
      pid: params.pid
    }
  })
}

/**
 * 任务组重命名
 * @memberof Worktile#entries
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {string} params.entry_id - 任务组entry_id
 * @param {string} params.name - 任务组名称
 * @see {@link https://open.worktile.com/wiki/update_entry.html}
 */
function rename (params) {
  return this.request({
    method: 'PUT',
    uri: '/v1/entries/' + params.entry_id,
    body: {
      name: params.name
    },
    qs: {
      pid: params.pid
    }
  })
}

/**
 * 删除任务组
 * @memberof Worktile#entries
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {string} params.entry_id - 任务组entry_id
 * @see {@link https://open.worktile.com/wiki/delete_entry.html}
 */
function remove (params) {
  return this.request({
    method: 'DELETE',
    uri: '/v1/entries/' + params.entry_id,
    qs: {
      pid: params.pid
    }
  })
}

/**
 * 关注任务组
 * @memberof Worktile#entries
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {string} params.entry_id - 任务组entry_id
 * @see {@link https://open.worktile.com/wiki/watcher_entry.html}
 */
function watch (params) {
  return this.request({
    method: 'POST',
    uri: '/v1/entries/' + params.entry_id + '/watcher',
    qs: {
      pid: params.pid
    }
  })
}

/**
 * 取消关注任务组
 * @memberof Worktile#entries
 * @param {object} params - 参数
 * @param {string} params.pid - 项目pid
 * @param {string} params.entry_id - 任务组entry_id
 * @see {@link https://open.worktile.com/wiki/unwatcher_entry.html}
 */
function unwatch (params) {
  return this.request({
    method: 'DELETE',
    uri: '/v1/entries/' + params.entry_id + '/watcher',
    qs: {
      pid: params.pid
    }
  })
}

/**
 * 项目的任务组(entry)接口
 * @namespace entries
 * @memberof Worktile#
 */
module.exports = {
  get: get,
  create: create,
  remove: remove,
  rename: rename,
  watch: watch,
  unwatch: unwatch
}
