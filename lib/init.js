#!/usr/bin/env node
exports.wdgxi = function (options) {

    const fs = require('fs-extra')
    var shell = require('shelljs');
    const path = require('path');

    file = ''

    if (options.h || options.help) {
        console.log([
            'Usage: wdgX --init ([options])',
            '',
            'options:',
            '  -h --help       display help for command',
            '',
            '  -f --force      Force initialization',
            '',
        ].join('\n'));
        process.exit();
    }

    result = {}


    async function writeins() {
        wjson = fs.readFileSync(path.dirname(__dirname) + "/wdgx-config.json", 'utf-8')
        fs.open('./wdgX-config.json', 'w+', function (err, fd) { });
        fs.writeFile('./wdgX-config.json', wjson,function (err) {
            if (err) {
                console.log('Unknown cause error. Please check the permissions and other issues')
                return console.error(err);
            }
            shell.echo('Initialization succeeded.\n\033[33mNow please refer to https://github.com/Xiaozeze127/wdgX explain how to configure JSON\n\033[0mIf you use git to upload the website, we recommend that you use wdgX-config.json put in .gitignore\nWhen you are finished, please run \"wdgx -g\"')
        });
    }

    async function CheckwdgX() {
        try {
            const packageObj = await fs.readJson('./wdgX-config.json')
            if (options.f || options.force) {
                file = 'wdgX-config.json'
                writeins(file)
            }
            else {
                console.log("Already initialized. If you need to build, you need to use \"wdgx -g\".\nIf you want to initialize again, please enter 'wdgx -i -f'")
            }
        } catch (err) {
            file = 'wdgX-config.json'
            writeins(file)
        }
    }


    CheckwdgX()
}