'use strict'

const Env = use('Env')
const path = require('path')

module.exports = {
  token: Env.getOrFail('TELEGRAM_TOKEN'),
  stage: {
    scenes: path.join(__dirname, '../app/Telegram/Scenes'),
    defaultScene: 'start'
  }
}
