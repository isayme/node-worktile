/* global describe, it */

var moment = require('moment')
var expect = require('chai').expect
var client = require('./client')

describe('tasks', function () {
  var project = null
  var entry = null
  var task = null
  var uid = null
  var taskName = 'testTaskName' + Date.now()
  var taskDesc = 'testTaskDesc' + Date.now()

  before(function (done) {
    client.projects.list().then(function (projects) {
      project = projects[0]
      expect(project).to.not.be.undefined
      return client.entries.create({
        pid: project.pid,
        name: 'entryName' + Date.now()
      })
    }).then(function (body) {
      entry = body
      expect(entry).to.not.be.undefined
      done()
    }).catch(function (err) {
      console.error(err)
    })
  })

  after(function (done) {
    client.entries.remove({
      entry_id: entry.entry_id,
      pid: project.pid
    }).then(function () {
      done()
    }).catch(function (err) {
      console.error(err)
    })
  })

  describe('create', function () {
    it('should ok', function (done) {
      client.tasks.create({
        pid: project.pid,
        entry_id: entry.entry_id,
        name: taskName,
        desc: taskDesc
      }).then(function (body) {
        task = body
        expect(task.pid).to.be.equal(project.pid)
        expect(task.entry_id).to.be.equal(entry.entry_id)
        expect(task.name).to.be.equal(taskName)
        expect(task.desc).to.be.equal(taskDesc)
        done()
      }).catch(function (err) {
        console.error(err)
      })
    })
  })

  describe('get', function () {
    it('should ok', function (done) {
      client.tasks.get({
        tid: task.tid,
        pid: project.pid
      }).then(function (body) {
        expect(body.created_at).to.be.equal(task.created_at)
        expect(body.name).to.be.equal(task.name)
        expect(body.desc).to.be.equal(task.desc)
        done()
      })
    })
  })

  describe('list', function () {
    it('should ok', function (done) {
      client.tasks.list({
        pid: project.pid
      }).then(function (tasks) {
        var found = false
        tasks.forEach(function (ele) {
          if (ele.tid !== task.tid) return
          found = true
          expect(ele.created_at).to.be.equal(task.created_at)
          expect(ele.name).to.be.equal(task.name)
          expect(ele.desc).to.be.equal(task.desc)
        })
        expect(found).to.be.true
        done()
      })
    })
  })

  describe('addMember & removeMember', function () {
    it('should ok', function (done) {
      client.users.profile().then(function (profile) {
        uid = profile.uid
        return client.tasks.addMember({
          tid: task.tid,
          uid: uid,
          pid: project.pid
        })
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.tasks.get({
          tid: task.tid,
          pid: project.pid
        })
      }).then(function (body) {
        expect(body.members.length).to.be.equal(1)
        expect(body.members[0].uid).to.be.equal(uid)
        return client.tasks.removeMember({
          tid: task.tid,
          uid: uid,
          pid: project.pid
        })
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.tasks.get({
          tid: task.tid,
          pid: project.pid
        })
      }).then(function (body) {
        expect(body.members.length).to.be.equal(0)
        done()
      }).catch(function (err) {
        console.error(err)
      })
    })
  })

  describe('expire & today', function () {
    it('should ok', function (done) {
      client.tasks.addMember({
        tid: task.tid,
        uid: uid,
        pid: project.pid
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.tasks.today()
      }).then(function (tasks) {
        expect(tasks.length).to.be.equal(0)
        return client.tasks.expire({
          tid: task.tid,
          pid: project.pid,
          expire: moment().endOf('day').toDate().getTime()
        })
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.tasks.today()
      }).then(function (tasks) {
        expect(tasks.length).to.be.equal(1)
        expect(tasks[0].tid).to.be.equal(task.tid)
        done()
      }).catch(function (err) {
        console.error(err)
      })
    })
  })

  describe('add/remove/list comments', function () {
    it('should ok', function (done) {
      var message = 'commentMessage' + Date.now()
      var cid = null

      client.tasks.listComments({
        tid: task.tid,
        pid: project.pid
      }).then(function (comments) {
        // create task is the first comment
        expect(comments.length).to.be.equal(1)
        return client.tasks.addComment({
          tid: task.tid,
          pid: project.pid,
          message: message
        })
      }).then(function (body) {
        expect(body.message).to.be.equal(message)
        cid = body.cid
        return client.tasks.listComments({
          tid: task.tid,
          pid: project.pid
        })
      }).then(function (comments) {
        expect(comments.length).to.be.equal(2)
        return client.tasks.removeComment({
          tid: task.tid,
          pid: project.pid,
          cid: cid
        })
      })
      .then(function (body) {
        expect(body.success).to.be.true
        return client.tasks.listComments({
          tid: task.tid,
          pid: project.pid
        })
      }).then(function (comments) {
        expect(comments.length).to.be.equal(1)
        done()
      }).catch(function (err) {
        console.error(err)
      })
    })
  })

  describe('remove', function () {
    it('should ok', function (done) {
      client.tasks.remove({
        tid: task.tid,
        pid: project.pid
      }).then(function (body) {
        expect(body.success).to.be.true
        done()
      })
    })
  })
})
