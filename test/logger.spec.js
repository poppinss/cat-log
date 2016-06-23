'use strict'

/**
 * cat-log
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const stdout = require("test-console").stderr
const Logger = require('../src/Logger')
const chai = require('chai')
const expect = chai.expect

describe('Logger', function() {

  it('should log using instance of Logger', function () {
    const inspect = stdout.inspect()
    const logger = new Logger()
    let match = 0
    logger.info('this is a log')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'this is a log'){
        match++
      }
    })
    expect(match).to.equal(1)
  })

  it('should not log verbose logs when not in verbose mode', function () {
    const inspect = stdout.inspect()
    const logger = new Logger()
    let match = 0
    logger.verbose('debugging')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'debugging'){
        match++
      }
    })
    expect(match).to.equal(0)
  })

  it('should log verbose logs when in verbose mode', function () {
    const inspect = stdout.inspect()
    const logger = new Logger('', 'verbose')
    let match = 0
    logger.verbose('debugging')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'debugging'){
        match++
      }
    })
    expect(match).to.equal(1)
  })

  it('should log warnings in info mode', function () {
    const inspect = stdout.inspect()
    const logger = new Logger()
    let match = 0
    logger.warn('what the heck')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'what the heck'){
        match++
      }
    })
    expect(match).to.equal(1)
  })

  it('should log errors in info mode', function () {
    const inspect = stdout.inspect()
    const logger = new Logger()
    let match = 0
    logger.error('fire')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'fire'){
        match++
      }
    })
    expect(match).to.equal(1)
  })

  it('should not log silly logs when not in silly mode', function () {
    const inspect = stdout.inspect()
    const logger = new Logger()
    let match = 0
    logger.silly('ahuhh')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'ahuhh'){
        match++
      }
    })
    expect(match).to.equal(0)
  })

  it('should log silly logs when in silly mode', function () {
    const inspect = stdout.inspect()
    const logger = new Logger('', 'silly')
    let match = 0
    logger.silly('ahuhh')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'ahuhh'){
        match++
      }
    })
    expect(match).to.equal(1)
  })

  it('should show debug messages when in debug mode', function () {
    const inspect = stdout.inspect()
    const logger = new Logger('', 'debug')
    let match = 0
    logger.debug(2+2)
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === '4'){
        match++
      }
    })
    expect(match).to.equal(1)
  })

  it('should add prefix when initated class with a prefix', function () {
    const inspect = stdout.inspect()
    const logger = new Logger('adonis', 'verbose')
    let match = 0
    logger.disableColor()
    logger.verbose('debugging')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'adonis debugging') {
        match++
      }
    })
    expect(match).to.equal(1)
  })

  it('should entertain debug flag from commandline', function () {
    const inspect = stdout.inspect()
    process.argv.push('--debug')
    const logger = new Logger()
    let match = 0
    logger.debug('received flag')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'received flag'){
        match++
      }
    })
    expect(match).to.equal(1)
  })

  it('should entertain verbose flag from commandline', function () {
    const inspect = stdout.inspect()
    process.argv.push('--verbose')
    const logger = new Logger()
    let match = 0
    logger.verbose('received flag')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'received flag'){
        match++
      }
    })
    expect(match).to.equal(1)
  })

  it('should entertain silly flag from commandline', function () {
    const inspect = stdout.inspect()
    process.argv.push('--silly')
    const logger = new Logger()
    let match = 0
    logger.silly('received flag')
    inspect.restore()
    inspect.output.forEach(function (item) {
      if(item.trim() === 'received flag'){
        match++
      }
    })
    expect(match).to.equal(1)
  })

  it('should tell the time spent between 2 logs', function (done) {
    const inspect = stdout.inspect()
    const logger = new Logger()
    logger.disableColor()
    let matchedTime = 0
    logger.info('1st message')
    setTimeout(function () {
      logger.info('2nd message')
      inspect.restore()
      inspect.output.forEach(function (item, index) {
        if(item.trim() === '2nd message') {
          matchedTime = inspect.output[index - 1]
        }
      })
      expect(parseInt(matchedTime.replace('ms'))).to.be.greaterThan(9)
      done()
    }, 10)
  })

})
