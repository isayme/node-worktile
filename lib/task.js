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

  },
  unwatch: function (params, callback) {

  },
  addLabel: function (params, callback) {

  },
  removeLabel: function (params, callback) {

  },
  complete: function (params, callback) {

  },
  uncomplete: function (params, callback) {

  },
  addTodo: function (params, callback) {

  },
  updateTodo: function (params, callback) {

  },
  completeTodo: function (params, callback) {

  },
  uncompleteTodo: function (params, callback) {

  },
  removeTodo: function (params, callback) {

  },
  listArchived: function (params, callback) {

  },
  archive: function (params, callback) {

  },
  unarchive: function (params, callback) {

  },
  archiveAll: function (params, callback) {

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
  },
}
