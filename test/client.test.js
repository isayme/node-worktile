/* global describe, it */

var expect = require('chai').expect
var Worktile = require('../')

describe('Worktile constructor', function () {
  it('should ok if access_token from string', function () {
    var c = new Worktile('access_token')
    expect(c.access_token).to.be.equal('access_token')
  })

  it('should ok if access_token from object', function () {
    var c = new Worktile({
      access_token: 'access_token'
    })
    expect(c.access_token).to.be.equal('access_token')
  })

  it('should throw if access_token missed', function () {
    function createWorktile () {
      return new Worktile()
    }
    expect(createWorktile).to.throw(Error)
  })

  it('baseUrl default to https://api.teambition.com', function () {
    var c = new Worktile('access_token')
    expect(c._defaults.baseUrl).to.be.equal('https://api.worktile.com')
  })

  it('custom baseUrl to http://api.project.ci', function () {
    var c = new Worktile({
      access_token: 'access_token',
      baseUrl: 'http://api.project.ci'
    })
    expect(c._defaults.baseUrl).to.be.equal('http://api.project.ci')
  })
})
