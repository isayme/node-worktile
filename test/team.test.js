/* global describe, it */

var expect = require('chai').expect
var client = require('./client')

describe('teams', function () {
  var teams = null

  describe('list', function () {
    it('should return ok', function (done) {
      client.teams.list(function (err, res, body) {
        expect(err).to.be.null
        expect(res.statusCode).to.be.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body).have.length.above(0)
        expect(res.body[0]).contain.keys(['team_id'])
        teams = body
        done()
      })
    })
  })

  describe('get', function () {
    it('should return ok', function (done) {
      client.teams.get(teams[0], function (err, res, body) {
        expect(err).to.be.null
        expect(res.body).contain.keys(['team_id'])
        done()
      })
    })
  })

  describe('getMembers', function () {
    it('should return ok', function (done) {
      client.teams.getMembers(teams[0], function (err, res, body) {
        expect(err).to.be.null
        expect(res.body).to.be.an('array')
        expect(res.body).have.length.above(0)
        expect(res.body[0]).contain.keys(['uid'])
        done()
      })
    })
  })

  describe('getProjects', function () {
    it('should return ok', function (done) {
      client.teams.getProjects(teams[0], function (err, res, body) {
        expect(err).to.be.null
        expect(res.body).to.be.an('array')
        expect(res.body).have.length.above(0)
        expect(res.body[0]).contain.keys(['pid'])
        done()
      })
    })
  })
})
