function list (callback) {
  return this.request({
    uri: '/v1/projects'
  }, callback)
}

function get (params, callback) {
  return this.request({
    uri: '/v1/projects/' + params.pid
  }, callback)
}

function getMembers (params, callback) {
  return this.request({
    uri: '/v1/projects/' + params.pid + '/members'
  }, callback)
}

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

function removeMemeber (params, callback) {
  return this.request({
    method: 'DELETE',
    uri: '/v1/projects/' + params.pid + '/members/' + params.uid
  }, callback)
}

module.exports = {
  list: list,
  get: get,
  getMembers: getMembers,
  addMemeber: addMemeber,
  removeMemeber: removeMemeber
}
