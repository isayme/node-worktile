function get (params, callback) {
  return this.request({
    uri: '/v1/entries',
    qs: {
      pid: params.pid
    }
  }, callback)
}

function create (params, callback) {
  return this.request({
    method: 'POST',
    uri: '/v1/entry',
    body: {
      name: params.name
    },
    qs: {
      pid: params.pid
    }
  }, callback)
}

function rename (params, callback) {
  return this.request({
    method: 'PUT',
    uri: '/v1/entries/' + params.entry_id,
    body: {
      name: params.name
    },
    qs: {
      pid: params.pid
    }
  }, callback)
}

function remove (params, callback) {
  return this.request({
    method: 'DELETE',
    uri: '/v1/entries/' + params.entry_id,
    qs: {
      pid: params.pid
    }
  }, callback)
}

function watch (params, callback) {
  return this.request({
    method: 'POST',
    uri: '/v1/entries/' + params.entry_id + '/watcher',
    qs: {
      pid: params.pid
    }
  }, callback)
}

function unwatch (params, callback) {
  return this.request({
    method: 'DELETE',
    uri: '/v1/entries/' + params.entry_id + '/watcher',
    qs: {
      pid: params.pid
    }
  }, callback)
}

module.exports = {
  get: get,
  create: create,
  remove: remove,
  rename: rename,
  watch: watch,
  unwatch: unwatch
}
