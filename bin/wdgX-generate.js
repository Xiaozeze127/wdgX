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
        fs.outputJson('./wdgX-config.json', { path: './', printprogressbar: true, t_html: './html/t_html', d_html: './html/d_html', disable_index: ["index.html", ".git", "CNAME", ".DS_Store", "README.md", "json", "js", "css", "html"], disable_catalog: ['img', 'documents'], change_title: [{}] })
        shell.echo('Couldn\'t find \"wdgX-config.json\"\n\033[33mNow please refer to https://github.com/Xiaozeze127/Static-site-generation-directory Explain how to configure JSON\n\033[0mWhen you are finished, please run \"wdgx g\" again')
    } catch (err) {

    }
}

bt = false

async function ifwb(basepath) {
}



async function CheckwdgX() {
    try {
        const packageObj = await fs.readJson('./wdgX-config.json')
        console.log("Finded \"wdgX-config.json\"\nNow production begins")
        bt = true
        if (bt) {
            console.log(ifwb("js"));
        }


    } catch (err) {
        file = 'wdgX-config.json'
        writeins(file)
    }
}


CheckwdgX()