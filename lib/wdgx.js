#!/usr/bin/env node

var chalk = require('chalk');
const { option } = require('commander');
var figlet = require('figlet');
var shell = require('shelljs');
'use strict';
var argv = require('minimist')(process.argv.slice(2));

var wdgxserver = require('../lib/server.js')
var wdgxg = require('../lib/generate.js')
var wdgxinit = require('../lib/init.js')

process.title = 'wdgX';



console.log(
    chalk.yellow(
        figlet.textSync("wdgX")
    ),
)

if (argv.s || argv.server) {
    wdgxserver.wdgxs(argv)
}
else if (argv.g || argv.generate) {
    wdgxg.wdgxg(argv)
}
else if (argv.i || argv.init) {
    wdgxinit.wdgxi(argv)
}
else if (argv.h || argv.help) {
    console.log([
        chalk.yellow(
            figlet.textSync("wdgX")
        ),
        'Usage: wdgX [options] ([options])',
        '',
        'options:',
        '  -h --help       display help for command',
        '  -v --version    output the version number',
        '',
        '  -g --generate   Static website directory generation',
        '  -i --init       Init wdgX',
        '  -s --server     Starts a local server. By default, this is at http://localhost:4000/.',
        '',
        shell.echo("Source code: \033[34mhttps://github.com/Xiaozeze127/wdgX\033[0m"),

    ].join('\n'));
    process.exit();
}
else {
    console.log(
        '\nUnknown command. For help, please enter "wdgx -h"'
    )
}