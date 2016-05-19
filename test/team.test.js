/* global describe, it */

var expect = require('chai').expect
var client = require('./client')

describe('teams', function () {
  var teams = null

  describe('list', function () {
    it('should ok', function (done) {
      client.teams.list().then(function (body) {
        expect(body).to.be.an('array')
        expect(body).have.length.above(0)
        expect(body[0]).contain.keys(['team_id'])
        teams = body
        done()
      })
    })
  })

  describe('get', function () {
    it('should ok', function (done) {
      client.teams.get(teams[0]).then(function (body) {
        expect(body).contain.keys(['team_id'])
        done()
      })
    })
  })

  describe('getMembers', function () {
    it('should ok', function (done) {
      client.teams.getMembers(teams[0]).then(function (body) {
        expect(body).to.be.an('array')
        expect(body).have.length.above(0)
        expect(body[0]).contain.keys(['uid'])
        done()
      })
    })
  })

  describe('getProjects', function () {
    it('should ok', function (done) {
      client.teams.getProjects(teams[0]).then(function (body) {
        expect(body).to.be.an('array')
        expect(body).have.length.above(0)
        expect(body[0]).contain.keys(['pid'])
        done()
      })
    })
  })
})
