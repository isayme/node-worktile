/* global describe, it */

var expect = require('chai').expect
var client = require('./client')

describe('teams', function () {
  var teams = null

  describe('getAll', function () {
    it('should return ok', function (done) {
      client.teams.getAll(function (err, res, body) {
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

  describe('getById', function () {
    it('should return ok', function (done) {
      client.teams.getById(teams[0].team_id, function (err, res, body) {
        expect(err).to.be.null
        expect(res.body).contain.keys(['team_id'])
        done()
      })
    })
  })

  describe('getMembersById', function () {
    it('should return ok', function (done) {
      client.teams.getMembersById(teams[0].team_id, function (err, res, body) {
        expect(err).to.be.null
        expect(res.body).to.be.an('array')
        expect(res.body).have.length.above(0)
        expect(res.body[0]).contain.keys(['uid'])
        done()
      })
    })
  })

  describe('getProjectsById', function () {
    it('should return ok', function (done) {
      client.teams.getProjectsById(teams[0].team_id, function (err, res, body) {
        expect(err).to.be.null
        expect(res.body).to.be.an('array')
        expect(res.body).have.length.above(0)
        expect(res.body[0]).contain.keys(['pid'])
        done()
      })
    })
  })
})
