'use strict'

const _ = require('lodash')
const Config = use('Config')
const { join, sep } = require('path')
const { Command } = require('@adonisjs/ace')

class MakeScene extends Command {
  /**
   * Command signature required by ace.
   *
   * @return {string}
   */
  static get signature () {
    return 'make:tscene { name: Name of scene }'
  }

  /**
   * Command description.
   *
   * @return {string}
   */
  static get description () {
    return 'Make a new Telegram Scene'
  }

  /**
   * Method called when command is executed. This method will
   * require all files from the migrations directory
   * and execute all pending schema files.
   *
   * @param  {object}   args
   *
   * @return {Promise<void>}
   */
  async handle ({ name }) {
    const templatePath = join(__dirname, '../templates/Scene.mustache')
    const filePath = join(Config.get('telegram.stage.scenes'), _.upperFirst(_.camelCase(name))) + 'Scene.js'
    const templateContent = await this.readFile(templatePath, 'utf-8')

    await this.generateFile(filePath, templateContent, { name })

    const createdFile = filePath.replace(process.cwd(), '').replace(sep, '')
    console.log(`${this.icon('success')} ${this.chalk.green('create')}  ${createdFile}`)
  }
}

module.exports = MakeScene