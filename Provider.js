'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class TelegramProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.bind('Telegram/Commands/Make:Scene', () => require('./commands/makeScene'))
    this.app.singleton('Telegram', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const Logger = this.app.use('Adonis/Src/Logger')
      return new (require('./index.js'))(Config, Logger)
    })
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  async boot () {
    const ace = use('@adonisjs/ace')
    ace.addCommand('Telegram/Commands/Make:Scene')
  }
}

module.exports = TelegramProvider
