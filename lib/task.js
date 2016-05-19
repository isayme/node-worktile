var comment = require('./comment')

module.exports = {
  list: function (params) {
    return this.request({
      uri: '/v1/tasks',
      qs: {
        pid: params.pid
      }
    })
  },
  today: function (params) {
    return this.request({
      uri: '/v1/tasks/today'
    })
  },
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
  get: function (params) {
    return this.request({
      uri: '/v1/tasks/' + params.tid,
      qs: {
        pid: params.pid
      }
    })
  },
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
  remove: function (params) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid,
      qs: {
        pid: params.pid
      }
    })
  },
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
  removeMember: function (params) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/members/' + params.uid,
      qs: {
        pid: params.pid
      }
    })
  },
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
  unwatch: function (params) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/watchers/' + params.uid,
      qs: {
        pid: params.pid
      }
    })
  },
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
  complete: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/complete',
      qs: {
        pid: params.pid
      }
    })
  },
  uncomplete: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/uncomplete',
      qs: {
        pid: params.pid
      }
    })
  },
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
  completeTodo: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/todos/' + params.todo_id + '/checked',
      qs: {
        pid: params.pid
      }
    })
  },
  uncompleteTodo: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/todos/' + params.todo_id + '/unchecked',
      qs: {
        pid: params.pid
      }
    })
  },
  removeTodo: function (params) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/todos/' + params.todo_id,
      qs: {
        pid: params.pid
      }
    })
  },
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
  archive: function (params) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/archive',
      qs: {
        pid: params.pid
      }
    })
  },
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
  addComment: function (params) {
    params.__id = params.tid
    return comment.create.call(this, 'tasks', params)
  },
  removeComment: function (params) {
    params.__id = params.tid
    return comment.remove.call(this, 'tasks', params)
  },
  listComments: function (params) {
    params.__id = params.tid
    return comment.list.call(this, 'tasks', params)
  }
}
