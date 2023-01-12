#!/usr/bin/env node
const program = require('commander')
const helpOptions = require('./lib/core/help.js')
const createCommands = require('./lib/core/create.js')

// 查看版本号
program.version(require('./package.json').version)

// 帮助和可选信息
helpOptions()

createCommands()

program.parse(process.argv)
