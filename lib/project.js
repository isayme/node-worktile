function getAll (callback) {
  return this.request({
    uri: '/v1/projects'
  }, callback)
}

function getById (_id, callback) {
  return this.request({
    uri: '/v1/projects/' + _id
  }, callback)
}

function getMembersById (_id, callback) {
  return this.request({
    uri: '/v1/projects/' + _id + '/members'
  }, callback)
}

function addMemeber (_id, uid, role, callback) {
  return this.request({
    method: 'POST',
    uri: '/v1/projects/' + _id + '/members',
    body: {
      uid: uid,
      role: role
    }
  }, callback)
}

function removeMemeber (_id, uid, callback) {
  return this.request({
    method: 'DELETE',
    uri: '/v1/projects/' + _id + '/members/' + uid
  }, callback)
}

module.exports = {
  getAll: getAll,
  getById: getById,
  getMembersById: getMembersById,
  addMemeber: addMemeber,
  removeMemeber: removeMemeber
}
