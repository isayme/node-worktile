/* global describe, it */

var expect = require('chai').expect
var client = require('./client')

describe('projects', function () {
  var projects = null
  var uid = '12c55ed2d8994db5946b999c35c2df20'

  describe('list', function () {
    it('should ok', function (done) {
      client.projects.list().then(function (body) {
        expect(body).to.be.an('array')
        expect(body).have.length.above(0)
        expect(body[0]).contain.keys(['pid'])
        projects = body
        done()
      })
    })
  })

  describe('get', function () {
    it('should ok', function (done) {
      client.projects.get(projects[0]).then(function (body) {
        expect(body).contain.keys(['pid'])
        done()
      })
    })
  })

  describe('getMembers', function () {
    it('should ok', function (done) {
      client.projects.getMembers(projects[0]).then(function (body) {
        expect(body).to.be.an('array')
        expect(body).have.length.above(0)
        expect(body[0]).contain.keys(['uid'])
        done()
      })
    })
  })

  describe('addMemeber', function () {
    it('should ok', function (done) {
      var role = 2
      client.projects.addMemeber({
        pid: projects[0].pid,
        uid: uid,
        role: role
      }).then(function (body) {
        expect(body).contain.keys(['uid', 'role'])
        expect(body.role).to.be.equal(role)
        done()
      })
    })
  })

  describe('removeMemeber', function () {
    it('should ok', function (done) {
      client.projects.removeMemeber({
        pid: projects[0].pid,
        uid: uid
      }).then(function (body) {
        expect(body.success).to.be.true
        done()
      })
    })
  })
})
