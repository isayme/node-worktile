module.exports = {
  create: function (modelTypes, params) {
    return this.request({
      method: 'POST',
      uri: '/v1/' + modelTypes + '/' + params.__id + '/comment',
      body: {
        message: params.message,
        fids: params.fids
      },
      qs: {
        pid: params.pid
      }
    })
  },
  remove: function (modelTypes, params) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/' + modelTypes + '/' + params.__id + '/comments/' + params.cid,
      qs: {
        pid: params.pid
      }
    })
  },
  list: function (modelTypes, params) {
    return this.request({
      uri: '/v1/' + modelTypes + '/' + params.__id + '/comments/',
      qs: {
        pid: params.pid
      }
    })
  }
}
