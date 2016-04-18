var comment = require('./comment')

/**
 * 话题(post)接口
 * @namespace posts
 * @memberof Worktile#
 */
module.exports = {
  /**
   * 获取话题列表
   * @memberof Worktile#posts
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {requestCallback} callback
   * @see {@link https://open.worktile.com/wiki/posts.html}
   */
  list: function (params, callback) {
    return this.request({
      uri: '/v1/posts',
      qs: {
        pid: params.pid
      }
    }, callback)
  },

  /**
   * 发起话题
   * @memberof Worktile#posts
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.name - 话题名称
   * @param {string} [params.content] - 话题内容
   * @param {requestCallback} callback
   * @see {@link https://open.worktile.com/wiki/add_post.html}
   */
  create: function (params, callback) {
    return this.request({
      method: 'POST',
      uri: '/v1/post',
      qs: {
        pid: params.pid
      },
      body: {
        name: params.name,
        content: params.content
      }
    }, callback)
  },

  /**
   * 获取话题详情
   * @memberof Worktile#posts
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.post_id - 话题post_id
   * @param {requestCallback} callback
   * @see {@link https://open.worktile.com/wiki/post_detail.html}
   */
  get: function (params, callback) {
    return this.request({
      uri: '/v1/posts/' + params.post_id,
      qs: {
        pid: params.pid
      }
    }, callback)
  },

  /**
   * 修改话题
   * @memberof Worktile#posts
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.post_id - 话题post_id
   * @param {requestCallback} callback
   * @see {@link https://open.worktile.com/wiki/update_post.html}
   */
  update: function (params, callback) {
    return this.request({
      method: 'PUT',
      uri: '/v1/posts/' + params.post_id,
      body: {
        name: params.name,
        content: params.content
      },
      qs: {
        pid: params.pid
      }
    }, callback)
  },

  /**
   * 删除话题
   * @memberof Worktile#posts
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.post_id - 话题post_id
   * @param {requestCallback} callback
   * @see {@link https://open.worktile.com/wiki/delete_post.html}
   */
  remove: function (params, callback) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/posts/' + params.post_id,
      qs: {
        pid: params.pid
      }
    }, callback)
  },

  /**
   * 添加关注话题
   * @memberof Worktile#posts
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.post_id - 话题post_id
   * @param {array} params.uids - 项目成员uid的集合
   * @param {requestCallback} callback
   * @see {@link https://open.worktile.com/wiki/watcher_post.html}
   */
  watch: function (params, callback) {
    return this.request({
      method: 'POST',
      uri: '/v1/posts/' + params.post_id + '/watcher',
      body: {
        uids: params.uids
      },
      qs: {
        pid: params.pid
      }
    }, callback)
  },

  /**
   * 取消关注话题
   * @memberof Worktile#posts
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.post_id - 话题post_id
   * @param {string} params.uid - 项目成员uid的集合
   * @param {requestCallback} callback
   * @see {@link https://open.worktile.com/wiki/unwatcher_post.html}
   */
  unwatch: function (params, callback) {
    return this.request({
      method: 'DELETE',
      uri: '/v1/posts/' + params.post_id + '/watchers/' + params.uid,
      qs: {
        pid: params.pid
      }
    }, callback)
  },

  /**
   * 添加评论
   * @memberof Worktile#posts
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.post_id - 话题post_id
   * @param {string} params.message - 评论内容
   * @param {array} [params.fids] - 文件fid集合
   * @param {requestCallback} callback
   * @see {@link https://open.worktile.com/wiki/add_comment_post.html}
   */
  addComment: function (params, callback) {
    params.__id = params.post_id
    return comment.create.call(this, 'posts', params, callback)
  },

  /**
   * 删除评论
   * @memberof Worktile#posts
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.post_id - 话题post_id
   * @param {string} params.cid - 评论的cid
   * @param {requestCallback} callback
   * @see {@link https://open.worktile.com/wiki/add_comment_post.html}
   */
  removeComment: function (params, callback) {
    params.__id = params.post_id
    return comment.remove.call(this, 'posts', params, callback)
  },

  /**
   * 获取话题的评论列表
   * @memberof Worktile#posts
   * @param {object} params - 参数
   * @param {string} params.pid - 项目pid
   * @param {string} params.post_id - 话题post_id
   * @param {requestCallback} callback
   * @see {@link https://open.worktile.com/wiki/post_comments.html}
   */
  listComments: function (params, callback) {
    params.__id = params.post_id
    return comment.list.call(this, 'posts', params, callback)
  }
}
