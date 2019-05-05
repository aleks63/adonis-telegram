'use strict'

const { join } = require('path')

module.exports = async function (cli) {
  await cli.makeConfig('telegraf.js', join(__dirname, './config/telegram.js'))
    .catch((e) => {})
  cli.command.completed('create', 'config/telegram.js')
}
