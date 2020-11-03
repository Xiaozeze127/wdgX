#!/usr/bin/env node

var chalk = require('chalk');
var figlet = require('figlet');
var http = require("http");
var exec = require('child_process').exec;
const { spawn } = require('child_process');
var program = require('commander')
'use strict';
var argv = require('minimist')(process.argv.slice(2));

var wdgxserver = require('../lib/server.js')
var wdgxg = require('../lib/generate.js')
var wdgxinit = require('../lib/init.js')
var wdgxc = require('../lib/clean.js')
var bjsonf = require('../package.json');
var version = bjsonf.version
program
    .version(version)
    .action(function (cmd) {
        cmdValue = cmd;
    });

process.title = 'wdgX';



console.log(
    chalk.yellow(
        figlet.textSync("wdgX")
    ),
)


http.get('http://www.wdgx.com.cn/version.json', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    // 任何 2xx 状态码都表示成功的响应，但是这里只检查 200。
    if (statusCode !== 200) {
        error = new Error('Version information request failed\n' +
            `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('无效的 content-type.\n' +
            `Expected application/json But received was ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // 消费响应的数据来释放内存。
        res.resume(); if (argv.s || argv.server) {
            wdgxserver.wdgxs(argv)
        }
        else if (argv.v || argv.version) {
            console.log(version)
        }
        else if (argv.g || argv.generate) {
            wdgxg.wdgxg(argv)
        }
        else if (argv.i || argv.init) {
            wdgxinit.wdgxi(argv)
        }
        else if (argv.c || argv.clean) {
            wdgxc.wdgxc(argv)
        }
        else if (argv.h || argv.help) {
            console.log([
                'Usage: wdgX [options] ([options])',
                '',
                'options:',
                '  -h --help       display help for command',
                '  -v --version    output the version number',
                '',
                '  -g --generate   Static website directory generation',
                '  -i --init       Init wdgX',
                '  -s --server     Starts a local server. By default, this is at http://localhost:4000/.',
                '  -c --clean      Clean all webpage(except disable_index)',
                '',
                "Source code: \033[34mhttps://github.com/Xiaozeze127/wdgX\033[0m\n"

            ].join('\n'));
            process.exit();
        }
        else {
            console.log(
                'For help, please enter "wdgx -h"'
            )
        }
    }
    else {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                var versionn = parsedData.lastv;
                if (versionn > version) {
                    console.log("A new version is available, the latest version is", versionn, ", The current version is", version)
                    http.get('http://www.wdgx.com.cn/version.json', (res) => {
                        const { statusCode } = res;
                        const contentType = res.headers['content-type'];

                        let error;
                        // 任何 2xx 状态码都表示成功的响应，但是这里只检查 200。
                        if (statusCode !== 200) {
                            error = new Error('Version information request failed\n' +
                                `Status Code: ${statusCode}`);
                        } else if (!/^application\/json/.test(contentType)) {
                            error = new Error('无效的 content-type.\n' +
                                `Expected application/json But received was ${contentType}`);
                        }
                        res.setEncoding('utf8');
                        let rawData2 = '';
                        res.on('data', (chunk) => { rawData += chunk; });
                        res.on('end', () => {
                            const parsedData2 = JSON.parse(rawData2);
                            if (parsedData[versionn] || parsedData2[version]) {
                                console.log(versionn + ' This is a version that must be updated and we helping you install the update\nPlease wait')
                                sh = spawn('npm', ['i', 'wdgx', '-g']);
                                sh.stdout.on('data', (data) => {
                                    console.log(`${data}`);
                                });
                            
                                sh.stderr.on('data', (data) => {
                                    console.error(`${data}`);
                                });
                            
                                sh.on('close', (code) => {
                                    console.log(`Exit code: ${code}`);
                                    for (var i = 0; i < 4; i++) {
                                        str[i] = ''
                                    }console.log("Update complete")
                                    if (argv.s || argv.server) {
                                        wdgxserver.wdgxs(argv)
                                    }
                                    else if (argv.v || argv.version) {
                                        console.log(version)
                                    }
                                    else if (argv.g || argv.generate) {
                                        wdgxg.wdgxg(argv)
                                    }
                                    else if (argv.i || argv.init) {
                                        wdgxinit.wdgxi(argv)
                                    }
                                    else if (argv.c || argv.clean) {
                                        wdgxc.wdgxc(argv)
                                    }
                                    else if (argv.h || argv.help) {
                                        console.log([
                                            'Usage: wdgX [options] ([options])',
                                            '',
                                            'options:',
                                            '  -h --help       display help for command',
                                            '  -v --version    output the version number',
                                            '',
                                            '  -g --generate   Static website directory generation',
                                            '  -i --init       Init wdgX',
                                            '  -s --server     Starts a local server. By default, this is at http://localhost:4000/.',
                                            '  -c --clean      Clean all webpage(except disable_index)',
                                            '',
                                            "Source code: \033[34mhttps://github.com/Xiaozeze127/wdgX\033[0m\n"

                                        ].join('\n'));
                                        process.exit();
                                    }
                                    else {
                                        console.log(
                                            'For help, please enter "wdgx -h"'
                                        )
                                    }
                                });
                            }
                        })
                    })


                }
                else {
                    console.log("It's the latest version")
                    if (argv.s || argv.server) {
                        wdgxserver.wdgxs(argv)
                    }
                    else if (argv.v || argv.version) {
                        console.log(version)
                    }
                    else if (argv.g || argv.generate) {
                        wdgxg.wdgxg(argv)
                    }
                    else if (argv.i || argv.init) {
                        wdgxinit.wdgxi(argv)
                    }
                    else if (argv.c || argv.clean) {
                        wdgxc.wdgxc(argv)
                    }
                    else if (argv.h || argv.help) {
                        console.log([
                            'Usage: wdgX [options] ([options])',
                            '',
                            'options:',
                            '  -h --help       display help for command',
                            '  -v --version    output the version number',
                            '',
                            '  -g --generate   Static website directory generation',
                            '  -i --init       Init wdgX',
                            '  -s --server     Starts a local server. By default, this is at http://localhost:4000/.',
                            '  -c --clean      Clean all webpage(except disable_index)',
                            '',
                            "Source code: \033[34mhttps://github.com/Xiaozeze127/wdgX\033[0m\n"

                        ].join('\n'));
                        process.exit();
                    }
                    else {
                        console.log(
                            'For help, please enter "wdgx -h"'
                        )
                    }
                }

            } catch (e) {
                console.error(e.message);
            }
        });
    }


}).on('error', (e) => {
    console.error(`Unable to connect to server.\n${e.message}`);
    try {
        if (argv.s || argv.server) {
            wdgxserver.wdgxs(argv)
        }
        else if (argv.v || argv.version) {
            console.log(version)
        }
        else if (argv.g || argv.generate) {
            wdgxg.wdgxg(argv)
        }
        else if (argv.i || argv.init) {
            wdgxinit.wdgxi(argv)
        }
        else if (argv.c || argv.clean) {
            wdgxc.wdgxc(argv)
        }
        else if (argv.h || argv.help) {
            console.log([
                'Usage: wdgX [options] ([options])',
                '',
                'options:',
                '  -h --help       display help for command',
                '  -v --version    output the version number',
                '',
                '  -g --generate   Static website directory generation',
                '  -i --init       Init wdgX',
                '  -s --server     Starts a local server. By default, this is at http://localhost:4000/.',
                '  -c --clean      Clean all webpage(except disable_index)',
                '',
                "Source code: \033[34mhttps://github.com/Xiaozeze127/wdgX\033[0m\n"

            ].join('\n'));
            process.exit();
        }
        else {
            console.log(
                'For help, please enter "wdgx -h"'
            )
        }

    } catch (e) {
        console.error(e.message);
    }
});