'use strict'

var request = require('request')
var debug = require('debug')('worktile')

/**
 * 回调函数, 处理API返回信息
 * @callback requestCallback
 * @param {error} err - 错误信息
 * @param {object} response - 响应对象
 * @param {object} body - API返回数据
 */

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

  var _request = request.defaults(this._defaults)
  this.request = function (options, callback) {
    if (callback) {
      return _request(options, callback)
    } else if (Promise) {
      return new Promise(function (resolve, reject) {
        _request(options, function (err, res, body) {
          if (err) {
            reject(err)
          } else if (res.statusCode < 200 || res.statusCode >= 300) {
            err = new Error(body.error_message)
            err.code = body.error_code
            reject(err)
          } else {
            resolve(body)
          }
        })
      })
    } else {
      throw new Error('callback or promise feature required')
    }
  }
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
