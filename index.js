'use strict'

const glob = require('glob')

const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Session = require('telegraf/session')

class Telegram {
  constructor (config, logger) {
    this.bot = new Telegraf(config.get('telegram.token'))
    this.config = config
    this.logger = logger
  }

  async run () {
    this.bot.catch(e => this.logger.error(e.message))
    this.bot.use(Session())

    if (this.config.get('telegram.stage')) {
      const scenes = glob.sync(this.config.get('telegram.stage.scenes') + '/**/*.js')
        .map(filePath => {
          const match = filePath.match(/\/([a-z0-9]+)Scene\.js/i)
          const scene = new Scene(match[1].toLowerCase())
          const { enter, leave } = new (require(filePath))
          scene.enter(enter)
          scene.leave(leave)
          return scene
        })
      const stage = new Stage(scenes, {
        default: this.config.get('telegram.stage.defaultScene')
      })
      this.bot.use(stage.middleware())
    }

    this.bot.on('message', ctx => ctx.scene.enter(ctx.message.text))
    await this.bot.launch()
    this.logger.info('Telegram started: polling')
  }
}

module.exports = Telegram