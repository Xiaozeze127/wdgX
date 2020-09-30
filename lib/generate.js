#!/usr/bin/env node

exports.wdgxg = function (options) {
    const fs = require('fs-extra')
    var shell = require('shelljs');

    file = ''


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
            console.log("You are not initialized. Please execute \"wdgx -i\"")
        }
    }


    CheckwdgX()
}