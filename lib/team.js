function list (callback) {
  return this.request({
    uri: '/v1/teams'
  }, callback)
}

function get (params, callback) {
  return this.request({
    uri: '/v1/teams/' + params.team_id
  }, callback)
}

function getMembers (params, callback) {
  return this.request({
    uri: '/v1/teams/' + params.team_id + '/members'
  }, callback)
}

function getProjects (params, callback) {
  return this.request({
    uri: '/v1/teams/' + params.team_id + '/projects'
  }, callback)
}

module.exports = {
  list: list,
  get: get,
  getMembers: getMembers,
  getProjects: getProjects
}
