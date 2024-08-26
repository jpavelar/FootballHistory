'use strict';

var through = require('through')

var write = function write(data) {

  data = data.toString('utf8')

  //split on first occurance of =
  var envArr = data.split(/=(.+)?/)

  //clean up value, extracting from quotation if necessary
  if (!envArr[1]) envArr[1] = '';
  var val = envArr[1].replace(/^['"]/, '').replace(/['"]$/, '')

  var envObj = {
    key: envArr[0],
    value: val
  }
  this.emit('data', envObj)
}

var end = function end () {
  this.emit('end')
}

module.exports = function () {
  return through(write, end)
}

