/* global describe, it, before */

var expect = require('chai').expect
var client = require('./client')

describe('posts', function () {
  var project = null
  var postName = 'postName' + Date.now()
  var postContent = 'postContent' + Date.now()
  var post_id = null

  before(function (done) {
    client.projects.list().then(function (projects) {
      expect(projects.length).to.be.above(0)
      project = projects[0]
      done()
    })
  })

  describe('create', function () {
    it('should ok', function (done) {
      client.posts.create({
        pid: project.pid,
        name: postName,
        content: postContent
      }).then(function (body) {
        expect(body.name).to.be.equal(postName)
        expect(body.content).to.be.equal(postContent)
        post_id = body.post_id
        done()
      })
    })
  })

  describe('get', function () {
    it('should ok', function (done) {
      client.posts.get({
        pid: project.pid,
        post_id: post_id
      }).then(function (body) {
        expect(body.name).to.be.equal(postName)
        expect(body.content).to.be.equal(postContent)
        done()
      })
    })
  })

  describe('list', function () {
    it('should ok', function (done) {
      client.posts.list({
        pid: project.pid
      }).then(function (body) {
        expect(body).to.be.an('array')
        body.forEach(function (post) {
          if (post.post_id === post_id) {
            expect(post.name).to.be.equal(postName)
            expect(post.content).to.be.equal(postContent)
          }
        })
        done()
      })
    })
  })

  describe('update', function () {
    it('should ok', function (done) {
      client.posts.update({
        pid: project.pid,
        post_id: post_id,
        name: 'postName'
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.posts.get({
          pid: project.pid,
          post_id: post_id
        })
      }).then(function (body) {
        expect(body.name).to.be.equal('postName')
        expect(body.content).to.be.equal('')
        done()
      })
    })
  })

  describe('watch & unwatch', function () {
    var uid = null
    it('watch should ok', function (done) {
      client.users.profile().then(function (profile) {
        uid = profile.uid
        return client.posts.watch({
          post_id: post_id,
          pid: project.pid,
          uids: [uid]
        })
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.posts.get({
          pid: project.pid,
          post_id: post_id
        })
      }).then(function (body) {
        var found = body.watchers.some(function (watcher) {
          return watcher.uid === uid
        })
        expect(found).to.be.true
        done()
      })
    })

    it('unwatch should ok', function (done) {
      return client.posts.unwatch({
        post_id: post_id,
        pid: project.pid,
        uid: uid
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.posts.get({
          pid: project.pid,
          post_id: post_id
        })
      }).then(function (body) {
        var found = body.watchers.some(function (watcher) {
          return watcher.uid === uid
        })
        expect(found).to.be.false
        done()
      })
    })
  })

  describe('comments', function () {
    var message = 'commentMessage' + Date.now()
    var cid = null

    it('add comment should ok', function (done) {
      client.posts.listComments({
        post_id: post_id,
        pid: project.pid
      }).then(function (comments) {
        expect(comments.length).to.be.equal(0)
        return client.posts.addComment({
          post_id: post_id,
          pid: project.pid,
          message: message
        })
      }).then(function (body) {
        expect(body.message).to.be.equal(message)
        cid = body.cid
        done()
      })
    })

    it('list comments should ok', function (done) {
      client.posts.listComments({
        post_id: post_id,
        pid: project.pid
      }).then(function (comments) {
        expect(comments.length).to.be.equal(1)
        done()
      })
    })

    it('remove comment should ok', function (done) {
      client.posts.removeComment({
        post_id: post_id,
        pid: project.pid,
        cid: cid
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.posts.listComments({
          post_id: post_id,
          pid: project.pid
        })
      }).then(function (comments) {
        expect(comments.length).to.be.equal(0)
        done()
      })
    })
  })

  describe('remove', function () {
    it('should ok', function (done) {
      client.posts.remove({
        post_id: post_id,
        pid: project.pid
      }).then(function (body) {
        expect(body.success).to.be.true
        done()
      })
    })
  })
})
