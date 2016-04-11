function getAll (callback) {
  return this.request({
    uri: '/v1/teams'
  }, callback)
}

function getById (_id, callback) {
  return this.request({
    uri: '/v1/teams/' + _id
  }, callback)
}

function getMembersById (_id, callback) {
  return this.request({
    uri: '/v1/teams/' + _id + '/members'
  }, callback)
}

function getProjectsById (_id, callback) {
  return this.request({
    uri: '/v1/teams/' + _id + '/projects'
  }, callback)
}

module.exports = {
  getAll: getAll,
  getById: getById,
  getMembersById: getMembersById,
  getProjectsById: getProjectsById
}
