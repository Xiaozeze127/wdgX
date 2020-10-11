#!/usr/bin/env node

var chalk = require('chalk');
var figlet = require('figlet');
var http = require("http");
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


http.get('http://www.wdgx.com.cn/package.json', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    // 任何 2xx 状态码都表示成功的响应，但是这里只检查 200。
    if (statusCode !== 200) {
        error = new Error('请求失败\n' +
            `状态码: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('无效的 content-type.\n' +
            `期望的是 application/json 但接收到的是 ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // 消费响应的数据来释放内存。
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            var versionn = parsedData.version;
            var bjsonf = require('../package.json');
            var version = bjsonf.version
            if (versionn > version)
                console.log("A new version is available, the latest version is", versionn, ", The current version is", version)
            else
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
}).on('error', (e) => {
    console.error(`出现错误: ${e.message}`);
});