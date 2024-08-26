'use strict';

var envParser = require('../index.js')
  , expect    = require('chai').expect
  , env

describe('env-parser module', function () {

  describe('parsing env vars', function () {

    it('should accept an env string and emit an env object', function (done) {
      env = envParser().on('data', function (datum) {
        expect(datum.key).to.equal('user')
        expect(datum.value).to.equal('bob')
        done()
      })
      env.write('user=bob')
    })

    it('should accept a buffer', function (done) {
      env = envParser().on('data', function (datum) {
        expect(datum.key).to.equal('user')
        expect(datum.value).to.equal('bob')
        done()
      })
      env.write(new Buffer('user=bob', 'utf8'))
    })

    it('should handle strings with = chars in the value', function (done) {
      env = envParser().on('data', function (datum) {
        expect(datum.key).to.equal('user')
        expect(datum.value).to.equal('bo=b=asd=sda=da=')
        done()
      })
      env.write('user=bo=b=asd=sda=da=')
    })

    it('should handle double quoted values', function (done) {
      env = envParser().on('data', function (datum) {
        expect(datum.key).to.equal('SECRET_KEY')
        expect(datum.value).to.equal('1234asdf!@#$')
        done()
      })
      env.write('SECRET_KEY="1234asdf!@#$"')
    })

    it('should handle single values', function (done) {
      env = envParser().on('data', function (datum) {
        expect(datum.key).to.equal('SECRET_KEY')
        expect(datum.value).to.equal('1234asdf!@#$')
        done()
      })
      env.write('SECRET_KEY=\'1234asdf!@#$\'')
    })

    it('should handle missing value', function (done) {
      env = envParser().on('data', function (datum) {
        expect(datum.key).to.equal('SECRET_KEY')
        expect(datum.value).to.equal('')
        done()
      })
      env.write('SECRET_KEY=')
    })

  })
})
