/* global describe, it */

var expect = require('chai').expect
var Worktile = require('../')
var client = require('./client')

var fields = ['uid', 'name', 'display_name', 'email']

describe('users', function () {
  describe('profile', function () {
    it('should ok with callback', function (done) {
      client.users.profile(function (err, res, body) {
        expect(err).to.be.null
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).contain.keys(fields)
        done()
      })
    })

    it('should ok with promise', function (done) {
      client.users.profile().then(function (body) {
        expect(body).contain.keys(fields)
        done()
      })
    })
  })

  describe('invalid token', function () {
    var c = new Worktile('invalid access_token')

    it('should return 100006 when users.profile', function (done) {
      c.users.profile(function (err, res, body) {
        expect(err).to.be.null
        expect(body.error_code).to.be.equal(100006)
        done()
      })
    })

    it('should return 100006 when teams.getAll', function (done) {
      c.teams.list().catch(function (err) {
        expect(err.code).to.be.equal(100006)
        done()
      })
    })
  })
})
