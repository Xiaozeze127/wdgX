#!/usr/bin/env node

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
    try {
        ensurefile(file)
        fs.outputJson('./wdgX-config.json', {
            path: './',
            printprogressbar: true,
            t_html: './t.html',
            d_html: './d.html',
            disable_index: [
                "index.html",
                ".git",
                "CNAME",
                ".DS_Store",
                "README.md",
                "json",
                "js",
                "css",
                "node_modules",
                "package.json",
                "package-lock.json",
                "LICENSE",
                ".gitignore"],
            disable_catalog: [
                'img',
                'documents'],
            change_title: [
                {
                    "img": "photos"
                }
            ]
        })
        shell.echo('Initialization succeeded.\n\033[33mNow please refer to https://github.com/Xiaozeze127/wdgX Explain how to configure JSON\n\033[0mWhen you are finished, please run \"wdgx g\"')
    } catch (err) {

    }
}

async function CheckwdgX() {
    try {
        const packageObj = await fs.readJson('./wdgX-config.json')
        console.log("Already initialized. If you need to build, you need to use \"wdgx g\"")
    } catch (err) {
        file = 'wdgX-config.json'
        writeins(file)
    }
}


CheckwdgX()