/* global describe, it */

var expect = require('chai').expect
var client = require('./client')

describe('projects', function () {
  var projects = null
  var uid = '12c55ed2d8994db5946b999c35c2df20'

  describe('getAll', function () {
    it('should return ok', function (done) {
      client.projects.getAll(function (err, res, body) {
        expect(err).to.be.null
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body).have.length.above(0)
        expect(res.body[0]).contain.keys(['pid'])
        projects = body
        done()
      })
    })
  })

  describe('getById', function () {
    it('should return ok', function (done) {
      client.projects.getById(projects[0].pid, function (err, res, body) {
        expect(err).to.be.null
        expect(res.body).contain.keys(['pid'])
        done()
      })
    })
  })

  describe('getMembersById', function () {
    it('should return ok', function (done) {
      client.projects.getMembersById(projects[0].pid, function (err, res, body) {
        expect(err).to.be.null
        expect(res.body).to.be.an('array')
        expect(res.body).have.length.above(0)
        expect(res.body[0]).contain.keys(['uid'])
        done()
      })
    })
  })

  describe('addMemeber', function () {
    it('should return ok', function (done) {
      var role = 2
      client.projects.addMemeber(projects[0].pid, uid, role, function (err, res, body) {
        expect(err).to.be.null
        expect(res.body).contain.keys(['uid', 'role'])
        expect(res.body.role).to.be.equal(role)
        done()
      })
    })
  })

  describe('removeMemeber', function () {
    it('should return ok', function (done) {
      client.projects.removeMemeber(projects[0].pid, uid, function (err, res, body) {
        expect(err).to.be.null
        expect(body.result).to.be.true
        done()
      })
    })
  })
})
