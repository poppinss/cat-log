'use strict'

/**
 * cat-log
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const CatLog = require('../index')
new CatLog().info('This is info')
new CatLog().error('Some errors too')
console.log('This is console.log info')
setTimeout(function () {
  new CatLog().info('After 20 milliseconds')
}, 20)

setTimeout(function () {
  new CatLog().info('After 40 milliseconds')
}, 60)

setTimeout(function () {
  new CatLog().info('After 1 second')
}, 2064)
