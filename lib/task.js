var comment = require('./comment')

module.exports = {
  list: function (params, callback) {
    return this.request({
      uri: '/v1/tasks',
      qs: {
        pid: params.pid
      }
    }, callback)
  },
  today: function (params, callback) {
    return this.request({
      uri: '/v1/tasks/today'
    }, callback)
  },
  create: function (params, callback) {
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
    }, callback)
  },
  get: function (params, callback) {
    return this.request({
      uri: '/v1/tasks/' + params.tid,
      qs: {
        pid: params.pid
      }
    }, callback)
  },
  update: function (params, callback) {
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
    }, callback)
  },
  remove: function (params, callback) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid,
      qs: {
        pid: params.pid
      }
    }, callback)
  },
  move: function (params, callback) {
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
    }, callback)
  },
  expire: function (params, callback) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/expire',
      body: {
        expire: params.expire
      },
      qs: {
        pid: params.pid
      }
    }, callback)
  },
  addMember: function (params, callback) {
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
  removeMember: function (params, callback) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/members/' + params.uid,
      qs: {
        pid: params.pid
      }
    })
  },
  watch: function (params, callback) {
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
  unwatch: function (params, callback) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/watchers/' + params.uid,
      qs: {
        pid: params.pid
      }
    })
  },
  addLabel: function (params, callback) {
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
  removeLabel: function (params, callback) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/labels',
      qs: {
        label: params.label,
        pid: params.pid
      }
    })
  },
  complete: function (params, callback) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/complete',
      qs: {
        pid: params.pid
      }
    })
  },
  uncomplete: function (params, callback) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/uncomplete',
      qs: {
        pid: params.pid
      }
    })
  },
  addTodo: function (params, callback) {
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
  updateTodo: function (params, callback) {
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
  completeTodo: function (params, callback) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/todos/' + params.todo_id + '/checked',
      qs: {
        pid: params.pid
      }
    })
  },
  uncompleteTodo: function (params, callback) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/todos/' + params.todo_id + '/unchecked',
      qs: {
        pid: params.pid
      }
    })
  },
  removeTodo: function (params, callback) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/tasks/' + params.tid + '/todos/' + params.todo_id,
      qs: {
        pid: params.pid
      }
    })
  },
  listArchived: function (params, callback) {
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
  archive: function (params, callback) {
    return this.request({
      method: 'PUT',
      uri: '/v1/tasks/' + params.tid + '/archive',
      qs: {
        pid: params.pid
      }
    })
  },
  unarchive: function (params, callback) {
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
  archiveComplete: function (params, callback) {
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
  addComment: function (params, callback) {
    params.__id = params.tid
    return comment.create.call(this, 'tasks', params, callback)
  },
  removeComment: function (params, callback) {
    params.__id = params.tid
    return comment.remove.call(this, 'tasks', params, callback)
  },
  listComments: function (params, callback) {
    params.__id = params.tid
    return comment.list.call(this, 'tasks', params, callback)
  }
}
