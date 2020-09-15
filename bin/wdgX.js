#!/usr/bin/env node

var inquirer = require('inquirer');
var program = require('commander');//一个帮助快速开发Nodejs命令行工具的package
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs-extra'));
var chalk = require('chalk');//终端输出时颜色样式输出工具
var figlet = require('figlet');
var ora = require('ora');
var exec = require('promise-exec');
var shell = require('shelljs');//用于执行shell脚本的包

console.log(
  chalk.yellow(
    figlet.textSync("wdgX")
  ))

program.on('--help', () => {
  console.log()
  shell.echo("Source code: \033[34mhttps://github.com/Xiaozeze127/wdgX")
  console.log()
})

program
  .version(require('../package').version, '-v, --version')
program
  .usage('<command>')
  .command('generate', 'Static website directory generation')
  .alias('g')
  .command('init', 'Init wdgX')
  .alias('i')
  .parse(process.argv);