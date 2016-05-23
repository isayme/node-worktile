var comment = require('./comment')

/**
 * 任务(task)接口
 * @namespace tasks
 * @memberof Worktile#
 */
module.exports = {
  /**
   * 获取日程列表
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} [params.type] - 任务类型：all:默认，completed:已完成，uncompleted:未完成，expired:已过期
   * @see {@link https://open.worktile.com/wiki/tasks.html}
   */
  list: function (params) {
    return this.request({
      uri: '/v1/tasks',
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 即将过期的任务
   * @memberof Worktile#tasks
   * @see {@link https://open.worktile.com/wiki/today_tasks.html}
   */
  today: function () {
    return this.request({
      uri: '/v1/tasks/today'
    })
  },
  /**
   * 创建任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.entry_id - 任务组entry_id
   * @param {string} params.name - 任务名称
   * @param {string} [params.desc] - 任务描述
   * @see {@link https://open.worktile.com/wiki/add_task.html}
   */
  create: function (params) {
    return this.request({
      method: 'POST',
      uri: '/v1/task',
      body: {
        entry_id: params.entry_id,
        name: params.name,
        desc: params.desc
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 任务详情
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @see {@link https://open.worktile.com/wiki/task.html}
   */
  get: function (params) {
    return this.request({
      uri: '/v1/tasks/' + params.tid,
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 修改任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.name - 任务名称
   * @param {string} [params.desc] - 任务描述
   * @see {@link https://open.worktile.com/wiki/update_task.html}
   */
  update: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid,
      body: {
        name: params.name,
        desc: params.desc
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 删除任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @see {@link https://open.worktile.com/wiki/delete_task.html}
   */
  remove: function (params) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid,
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 移动任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.to_pid - 移动目标项目的pid
   * @param {string} params.to_entry_id - 移动目标项目的任务组id
   * @see {@link https://open.worktile.com/wiki/move_task.html}
   */
  move: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/move',
      body: {
        to_pid: params.to_pid,
        to_entry_id: params.to_entry_id
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 设置截止日期
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.expire - 设置截止日期的时间戳
   * @see {@link https://open.worktile.com/wiki/expire_task.html}
   */
  expire: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/expire',
      body: {
        expire: params.expire
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 分配任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.uid - 项目成员uid
   * @see {@link https://open.worktile.com/wiki/assign_task.html}
   */
  addMember: function (params) {
    return this.request({
      method: 'POST',
      uri: '/v1/tasks/' + params.tid + '/member',
      body: {
        uid: params.uid
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 取消分配任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.uid - 项目成员uid
   * @see {@link https://open.worktile.com/wiki/unassign_task.html}
   */
  removeMember: function (params) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/members/' + params.uid,
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 添加关注任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.uids - 项目成员uid的集合
   * @see {@link https://open.worktile.com/wiki/watcher_task.html}
   */
  watch: function (params) {
    return this.request({
      method: 'POST',
      uri: '/v1/tasks/' + params.tid + '/watcher',
      body: {
        uids: params.uids
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 取消关注任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.uid - 项目成员uid
   * @see {@link https://open.worktile.com/wiki/unwatcher_task.html}
   */
  unwatch: function (params) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/watchers/' + params.uid,
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 设置标签
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.label - 标签(项目中)名称
   * @see {@link https://open.worktile.com/wiki/add_label_task.html}
   */
  addLabel: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/labels',
      body: {
        label: params.label
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 删除标签
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.label - 任务标签名称
   * @see {@link https://open.worktile.com/wiki/delete_label_task.html}
   */
  removeLabel: function (params) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/labels',
      qs: {
        label: params.label,
        pid: params.pid
      }
    })
  },
  /**
   * 完成任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @see {@link https://open.worktile.com/wiki/complete_task.html}
   */
  complete: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/complete',
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 取消完成任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @see {@link https://open.worktile.com/wiki/uncomplete_task.html}
   */
  uncomplete: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/uncomplete',
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 添加检查项
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.name - 检查项内容
   * @see {@link https://open.worktile.com/wiki/add_todo_task.html}
   */
  addTodo: function (params) {
    return this.request({
      method: 'POST',
      uri: '/v1/tasks/' + params.tid + '/todo',
      body: {
        name: params.name
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 修改检查项
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.todo_id - 检查项id
   * @param {string} params.name - 检查项内容
   * @see {@link https://open.worktile.com/wiki/update_todo_task.html}
   */
  updateTodo: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/todos/' + params.todo_id,
      body: {
        name: params.name
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 完成检查项
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.todo_id - 检查项id
   * @see {@link https://open.worktile.com/wiki/complete_todo_task.html}
   */
  completeTodo: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/todos/' + params.todo_id + '/checked',
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 取消完成检查项
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.todo_id - 检查项id
   * @see {@link https://open.worktile.com/wiki/uncomplete_todo_task.html}
   */
  uncompleteTodo: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/todos/' + params.todo_id + '/unchecked',
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 删除检查项
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.todo_id - 检查项id
   * @see {@link https://open.worktile.com/wiki/delete_todo_task.html}
   */
  removeTodo: function (params) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/todos/' + params.todo_id,
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 获取项目的已归档的任务列表
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.page - 每页获取的任务数
   * @param {number} params.size - 当前页，默认只为1
   * @see {@link https://open.worktile.com/wiki/archived_tasks.html}
   */
  listArchived: function (params) {
    return this.request({
      method: 'GET',
      uri: '/v1/tasks/archived',
      qs: {
        pid: params.pid,
        page: params.page,
        size: params.size
      }
    })
  },
  /**
   * 归档任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @see {@link https://open.worktile.com/wiki/archive_task.html}
   */
  archive: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/archive',
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 激活归档任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.entry_id - 项目中的任务组id
   * @see {@link https://open.worktile.com/wiki/unarchive_task.html}
   */
  unarchive: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/unarchive',
      body: {
        entry_id: params.entry_id
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 归档项目中的任务
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @see {@link https://open.worktile.com/wiki/archive_project_task.html}
   */
  archiveComplete: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/archive',
      body: {
        entry_id: params.entry_id
      },
      qs: {
        pid: params.pid
      }
    })
  },
  /**
   * 添加评论
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.message - 评论内容
   * @param {string} [params.fids] - 文件fid集合
   * @see {@link https://open.worktile.com/wiki/add_comment_task.html}
   */
  addComment: function (params) {
    params.__id = params.tid
    return comment.create.call(this, 'tasks', params)
  },
  /**
   * 删除评论
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @param {string} params.cid - 评论的cid
   * @see {@link https://open.worktile.com/wiki/delete_comment_task.html}
   */
  removeComment: function (params) {
    params.__id = params.tid
    return comment.remove.call(this, 'tasks', params)
  },
  /**
   * 获取任务的评论列表
   * @memberof Worktile#tasks
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.tid - 任务tid
   * @see {@link https://open.worktile.com/wiki/task_comments.html}
   */
  listComments: function (params) {
    params.__id = params.tid
    return comment.list.call(this, 'tasks', params)
  }
}
