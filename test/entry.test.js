/* global describe, it, before */

var expect = require('chai').expect
var client = require('./client')

describe('entries', function () {
  var project = null
  var entryName = 'testEntry' + Date.now()
  var entry_id = null

  before(function (done) {
    client.projects.list().then(function (projects) {
      expect(projects.length).to.be.above(0)
      project = projects[0]
      done()
    })
  })

  describe('list', function () {
    it('should ok', function (done) {
      client.entries.get(project, function (err, res, body) {
        expect(err).to.be.null
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body).have.length.above(0)
        expect(res.body[0]).contain.keys(['entry_id'])
        done()
      })
    })
  })

  describe('create', function () {
    it('should ok', function (done) {
      client.entries.create({
        pid: project.pid,
        name: entryName
      }, function (err, res, body) {
        expect(err).to.be.null
        expect(res.body.name).to.be.equal(entryName)
        entry_id = res.body.entry_id
        done()
      })
    })
  })

  describe('rename', function () {
    var newName = 'newEntryName'
    it('should ok', function (done) {
      client.entries.rename({
        entry_id: entry_id,
        name: newName,
        pid: project.pid
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.entries.get({
          pid: project.pid
        })
      }).then(function (body) {
        expect(body).to.be.an('array')
        body.forEach(function (entry) {
          if (entry.entry_id === entry_id) {
            expect(entry.name).to.be.equal(newName)
          }
        })
        done()
      })
    })
  })

  describe('watch', function () {
    it('should ok', function (done) {
      client.entries.watch({
        entry_id: entry_id,
        pid: project.pid
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.entries.get({pid: project.pid})
      }).then(function (body) {
        expect(body).to.be.an('array')
        body.forEach(function (entry) {
          if (entry.entry_id === entry_id) {
            expect(entry.watched).to.be.equal(true)
          }
        })
        done()
      }).catch(function () {
        console.log(arguments)
      })
    })
  })

  describe('unwatch', function () {
    it('should ok', function (done) {
      client.entries.unwatch({
        entry_id: entry_id,
        pid: project.pid
      }).then(function (body) {
        expect(body.success).to.be.true
        return client.entries.get({pid: project.pid})
      }).then(function (body) {
        expect(body).to.be.an('array')
        body.forEach(function (entry) {
          if (entry.entry_id === entry_id) {
            expect(entry.watched).to.be.equal(false)
          }
        })
        done()
      })
    })
  })

  describe('remove', function () {
    it('should ok', function (done) {
      client.entries.remove({
        entry_id: entry_id,
        pid: project.pid
      }).then(function (body) {
        expect(body.success).to.be.true
        done()
      })
    })
  })
})
