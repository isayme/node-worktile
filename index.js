'use strict'

var request = require('request-promise')
var debug = require('debug')('worktile')

/**
 * Worktile client构造函数
 * @constructor
 * @param {string|object} options - access_token字符串或包含access_token属性的对象
 */
function Worktile (options) {
  if (typeof options === 'string') {
    options = {
      access_token: options
    }
  }

  options = options || {}
  this.access_token = options.access_token
  if (!this.access_token) {
    throw new Error('access_token required!')
  }

  this.options = options

  this._defaults = {
    baseUrl: options.baseUrl || 'https://api.worktile.com',
    gzip: true,
    json: true,
    headers: {
      access_token: this.access_token
    }
  }

  this.request = request.defaults(this._defaults)
  return this
}

function defineProperty (obj, key, module) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get: function () {
      var obj = require(module)
      obj.request = this.request
      obj._parent = this
      return obj
    }
  })
}

var services = {
  'users': 'user',
  'teams': 'team',
  'projects': 'project',
  'entries': 'entry',
  'tasks': 'task',
  'posts': 'post'
}

for (var key in services) {
  debug('loading service:', key)
  defineProperty(Worktile.prototype, key, './lib/' + services[key])
}

module.exports = Worktile
