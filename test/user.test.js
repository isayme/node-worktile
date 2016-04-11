/* global describe, it */

var expect = require('chai').expect
var client = require('./client')

var fields = ['uid', 'name', 'display_name', 'email']

describe('users', function () {
  describe('profile', function () {
    it('should return ok with callback', function (done) {
      client.users.profile(function (err, res, body) {
        expect(err).to.be.null
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).contain.keys(fields)
        done()
      })
    })

    it('should return ok with promise', function (done) {
      client.users.profile().then(function (body) {
        expect(body).contain.keys(fields)
        done()
      })
    })
  })
})
