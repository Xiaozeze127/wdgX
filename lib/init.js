#!/usr/bin/env node
exports.wdgxi = function (options) {

    const fs = require('fs-extra')
    var shell = require('shelljs');

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
        fs.open('./wdgX-config.json', 'w+', function (err, fd) { });
        fs.writeFile('./wdgX-config.json', '{\n    "path": \"./\",\n    "printprogressbar": true,\n    "e_html": "./e.html",\n    "disable_index": [\n        "index.html",\n        ".git",\n        "CNAME",\n        ".DS_Store",\n        "README.md",\n        "json",\n        "js",\n        "css",\n        "node_modules",\n        "package.json",\n        "package-lock.json",\n        "LICENSE",\n        ".gitignore"\n    ],\n    "disable_catalog": [\n        \"img\",\n        \"documents\"\n    ],\n    "change_title": [\n        {\n            "img": "photos"\n        }\n    ]\n}', function (err) {
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