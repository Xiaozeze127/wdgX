#!/usr/bin/env node
exports.wdgxi = function (options) {
    const fs = require('fs-extra')
    var shell = require('shelljs');

    file = ''


    async function ensurefile(f) {
        try {
            await fs.ensureFile(f)
        } catch (err) {
        }
    }

    result = {}


    async function writeins() {
        fs.open('./wdgX-config.json', 'w+', function (err, fd) { });
        fs.writeFile('./wdgX-config.json', '{\n    "path": \"./\",\n    "printprogressbar": true,\n    "e_html": "./e.html",\n    "disable_index": [\n        "index.html",\n        ".git",\n        "CNAME",\n        ".DS_Store",\n        "README.md",\n        "json",\n        "js",\n        "css",\n        "node_modules",\n        "package.json",\n        "package-lock.json",\n        "LICENSE",\n        ".gitignore"\n    ],\n    "disable_catalog": [\n        \"img\",\n        \"documents\"\n    ],\n    "change_title": [\n        {\n            "img": "photos"\n        }\n    ]\n}', function (err) {
            if (err) {
                console.log('Unknown cause error. Please check the permissions and other issues')
                return console.error(err);
            }
            shell.echo('Initialization succeeded.\n\033[33mNow please refer to https://github.com/Xiaozeze127/wdgX Explain how to configure JSON\n\033[0mWhen you are finished, please run \"wdgx -g\"')
        });
    }

    async function CheckwdgX() {
        try {
            fs.open('./wdgX-config.json', 'r', function (err, fd) { });
            if (options.f) {
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